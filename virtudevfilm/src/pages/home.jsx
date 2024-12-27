import '../App.css';
import React from 'react';
import FilmComponent from '../components/home';
import { useEffect } from 'react';

function Home() {

  useEffect(() => {
    document.title = 'VirtudevFilm - Accueil';
    document.body.style.backgroundColor = '#282c34';
    // const admin =localStorage.getItem("bearerToken")
    // console.log(admin)
  }, []);
  return (
    <div className="App">
      <FilmComponent/>
    </div>
  );
}

export default Home;


