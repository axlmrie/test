import React, { useEffect, useState } from "react";
import VideoPlayer from "../components/film";
import fetchData from "../function/fetchData";
import "../Style/Film.css";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

function Film() {
  const navigate = useNavigate();
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const film = urlParams.get("id"); // Récupération de l'ID du film à partir des paramètres de l'URL
  const [source, setSource] = useState("");
  const [titre, setTitre] = useState("");
  const [infoFilm, setInfoFilm] = useState();
  const [infoFilmBase, setInfoFilmBase] = useState();
  const [historique, setHistorique] = useState();
  const [background, setBackground] = useState();
  const [isVideoFullScreen, setIsVideoFullScreen] = useState(false); // Nouvel état

  useEffect(() => {
    if (film) {
      getFilm();
    }
  }, [film]);

  useEffect(() => {
    if (background) {
      document.body.style.cssText = `
        background-image: url(${background}) !important;
        background-size: cover !important;
        background-repeat: no-repeat !important;
      `;
    }

    return () => {
      document.body.style.cssText = ""; // Réinitialise tous les styles
    };
  }, [background]);

  useEffect(() => {
   
    if (infoFilmBase?.idPublic) {
      getFondEcran();
      setHistorique({
        "film": {
          "id": parseInt(infoFilmBase.id , 10)
        },
        "idUser": parseInt(localStorage.getItem("id") , 10)
      })
    }
  }, [infoFilmBase]);

   document.backgroundImage = `url(${background})`

  const infoFilmGet = async (idPublicFilm)=>{
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${idPublicFilm}?api_key=68d9ff239b97275ec78f106b3d526bdb&language=fr-FR`
      );
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.Response === "False") {
        throw new Error(data.Error || "Film non trouvé.");
      }
  

      return data;
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API :", error.message);
    }
  };
  
  const divStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover"
  };

  const getFondEcran = async ()=>{
    console.log("info "+ infoFilmBase)
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${infoFilmBase.idPublic}/images?api_key=68d9ff239b97275ec78f106b3d526bdb`
      );
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
  
      const data = await response.json();
      const test = "https://image.tmdb.org/t/p/original" + data.backdrops[1].file_path
      console.log(test)
      setBackground(test)

  
      if (data.Response === "False") {
        throw new Error(data.Error || "Film non trouvé.");
      }
  
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API :", error.message);
    }
  }

  const getFilm = async () => {
    try {
      const res = await fetchData("GET", "film/getFilmsById", film, "", true);
      const data = res;
      setInfoFilmBase(data);
      const titre = data.video.replaceAll(" ", ".");
      setTitre(data.titre);
      setSource(`https://virtudev.ovh/moovie/${titre}`);
      document.title = data.titre;
      const info = await infoFilmGet(data.idPublic);
      setInfoFilm(info);
    } catch (error) {
      console.error("Erreur lors de la récupération du film :", error);
    }
  };

  const renderInfoFilm = () => {
    const date = new Date(infoFilm.release_date);
    const formattedDate = new Intl.DateTimeFormat("fr-FR").format(date);

    const heures = Math.floor(infoFilm.runtime / 60);
    const resteMinutes = infoFilm.runtime % 60;

    return (
      <div style={{
        width: "100vw",
        height: "100vh",
        background: "rgb(0,0,0)",
        background:"linear-gradient(90deg, rgba(0,0,0,0.7) 30%, rgba(255,255,255,0.2) 65%)",
        display: "flex",
        flexDirection:"column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "20px",
        boxSizing: "border-box",
      }}>

<button
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            color: "#fff",
            background:"transparent",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
            fontWeight:"bolder"
          }}
          onClick={() => navigate(-1)} // Navigue vers la page précédente
        >
          ←
        </button>
        <h1 style={{top:"50px"}} id="titreFilm">{infoFilm.original_title}</h1>
        <h2>{infoFilm.tagline}</h2>
        <div>
          <ul id="listeGenre">
            <li>Genre:</li>
            {infoFilm.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <p>Date de sortie: {formattedDate}</p>
          <Rating
            name="size-large"
            value={(infoFilm.vote_average * 5) / 10}
            size="large"
          />
          <p>
            Durée : {heures}h {resteMinutes}min
          </p>
        </div>
        <h2>Résumé</h2>
        <p style={{width:"33vw"}} className="resume">{infoFilm.overview}</p>
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#676f9d",
            color: '#ffffff',
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={async () => {setIsVideoFullScreen(true); await fetchData('POST', 'user/createHistorique', '', historique);
          }}
        >
          Regarder le film
        </button>
      </div>
    );
  };

  return (
    <div className="App">
      {isVideoFullScreen ? (
        <VideoPlayer
          source={source}
          titre={titre}
          onClose={() => setIsVideoFullScreen(false)} // Gère la fermeture du lecteur
        />
      ) : (
        infoFilm ? renderInfoFilm() : "Chargement des informations du film..."
      )}
    </div>
  );
}

export default Film;
