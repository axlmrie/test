import { useState, useEffect } from "react"
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import fetchData from "../function/fetchData";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { colors } from "@mui/material";


function Log() {

    const[log, setLog] = useState()
    const[rows, setRows] = useState(null)
    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'nom', headerName: 'Nom', width: 130 },
      { field: 'prenom', headerName: 'Prenom', width: 130 },
      { field: 'date', headerName: 'Date', width: 150 },
      { field: 'ip', headerName: 'Ip', width: 130 },
    ];
    
    useEffect(()=>{
        handlelog()
    },[])

    useEffect(() => {
      console.log(rows)
    }, [rows]);
    
    const handlelog = async () => {
      try {
        const res = await fetchData("GET", "log/getAllLog", "", "", true);
    

        const transformedRows = res.map((item) => ({
          id: item.id,
          nom: item.utilisateur.nom,
          prenom: item.utilisateur.prenom,
          date: new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }).format(new Date(item.date)),
          ip: item.ip,
        }));
    
        setRows(transformedRows); 

      } catch (error) {
        console.error("Erreur lors de la récupération des logs :", error);
      }
    };
    

    if (!rows) {
      return      <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
      }

    return  <Paper sx={{ height: 550, width: '45%', marginLeft: "auto", marginRight: "auto" }}> 
                <DataGrid
                  rows={rows}
                  columns={columns}

                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                  sx={{ border: 0 , backgroundColor: "rgb(40, 44, 52)", color: "white"}}
                />
            </Paper>
}
export default Log