import React, { useEffect } from 'react';
import PageConnexion from '../components/login';
import '../App.css';


function Login() {
  useEffect(() => {
    document.title = 'VirtudevFilm - Connexion';
  }, []);

  return (
    <div className="App">
      {/* Ajouter la vidéo en arrière-plan */}
      <video autoPlay loop muted className="background-video">
        <source src="https://cdn.pixabay.com/video/2018/06/22/16880-276488602_large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <PageConnexion/>
    </div>
  );
}

export default Login;
