
import React, { useEffect, useState } from 'react';
import FormConnexion from './formConnexion';
import FormInscription from './formInscription';
import Button from '@mui/material/Button';
import fetchData from '../function/fetchData';

const PageConnexion = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [log , setLog] = useState("")

  const handleLogin = async (email, password, setErrorMessage) => {
    const response = await fetchData('POST','user/connexion','',{"username":email,"password":password},false);
    if(response){
      localStorage.setItem("bearerToken",response.tokens.bearer)
      localStorage.setItem("refreshToken",response.refresh)
      localStorage.setItem("admin",response.admin)
      localStorage.setItem("id",response.id)


      if (log != "") {
        const dateActuelle = new Date(); 
        const dateISO = dateActuelle.toISOString();
        await fetchData('POST','log/createLog','',{"ip":log,"date":dateISO, "utilisateur":{ "id": response.id}},false);
      }
      window.location.href = '/home'
    }
  };

  const handleSignUp = async (name, email, password, confirmPassword, setErrorMessage) => {

    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      return;
    }

    const response = await fetchData('POST','/user/inscription','',{"nom":name,"mdp":password,"email":email},false);
  };

  const ipPublic = async ()=>{
    await fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    setLog(data.ip)
  })
  .catch(error => {
    console.error('Erreur pour récupérer l\'IP publique :', error);
  });

  }

  useEffect(()=>{
    ipPublic()
  },[])


  return (
    <div className="login-container">
      {isSignUp ? (
        <FormInscription handleSignUp={handleSignUp} />
      ) : (
        <FormConnexion handleLogin={handleLogin} />
      )}
      <div className="mui-btn">
  <Button variant="contained" color="primary" onClick={() => setIsSignUp((prev) => !prev)}>
    {isSignUp ? 'Déjà inscrit ? Se connecter' : 'Pas encore de compte ? S\'inscrire'}
  </Button>

</div>
    </div>
  );
};

export default PageConnexion;
