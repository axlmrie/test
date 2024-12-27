import { useState, useEffect } from "react";
import fetchData from "../function/fetchData";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function UserInfo() {
  const [infoUser, setInfoUser] = useState(null); // Initialisé à null pour indiquer l'absence de données.

  useEffect(() => {
      handleInfo();
  }, []);

  const handleInfo = async () => {
    try {
      const res = await fetchData("GET", "user/info/", 1, "", true);
      setInfoUser(res);
    } catch (error) {
      console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
    }
  };


  if (!infoUser) {
  return      <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
  }

  return (

    <ul>
      <li>Prénom : {infoUser.prenom}</li>
      <li>Nom : {infoUser.nom}</li>
      <li>Email : {infoUser.email}</li>
      <li>Rôle : {infoUser.role}</li>
    </ul>
  );
}

export default UserInfo;
