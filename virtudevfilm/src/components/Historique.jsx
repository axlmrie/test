import { useState, useEffect } from "react";
import fetchData from "../function/fetchData";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Historique(){

    const [historique, setHisotrique] = useState(null)

    useEffect(()=>{
        handleHistorique()
    },[])

    const handleHistorique = async () => {
        try {
          const res = await fetchData("GET", "user/historique/", localStorage.getItem("id"), "", true);
          setHisotrique(res);
        } catch (error) {
          console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
        }
      };

    if (!historique) {
        return      <Box sx={{ display: 'flex', marginLeft: "auto", marginRight: "auto"  }}>
                        <CircularProgress />
                    </Box>
    }

    return <ul id="listeHistorique">
        {historique.map((film)=>{
            return <li key={film.id}><img src={film.film.image} alt={film.film.titre} width="250px" height="350px"/></li>
        })}
    </ul>
}
export default Historique