import SearchAppBar from "../components/header";
import React, { useEffect, useState } from "react";
import fetchData from "../function/fetchData";


function SagaFilm() {

    const [films, setFilms] = useState([]);

    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const saga = urlParams.get('id'); 

  
    useEffect(() => {
      document.body.style.backgroundColor = '#282c34'; 
    const fetchFilms = async () => {
        const filmResponse = await getFilms(saga);
        if (filmResponse) {
            setFilms(filmResponse); 
        }
        };
      if (saga) {
        fetchFilms();
      }
    }, [saga]);

  
  
    const getFilms = async (saga) => {
        try {
          const response = await fetchData('GET','film/saga/' + saga,'','',true);
          return await response;
        } catch (error) {
          console.error('Error fetching films:', error);
        }
      };

    const renderFilm = (film) => {
        const url = `film?id=${film.id}`;
    
        return (
          <ul key={film.id} className="film-container">
      <li style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        <a href={url} className="film-link">
          <img
            src={film.image}
            alt={`Affiche de ${film.titre}`}
            width="250px"
            height="350px"
            className="film-image"
          />
          <div className="film-overlay">
            <p className="film-title">{film.titre}</p>
            <p className="film-duration">{film.duree}</p>
          </div>
        </a>
      </li>
    </ul>
        );
      };



    return      <div className="App">
        <SearchAppBar showSearchBar={false}/>

      <h1>
        Films :
      </h1>
      <hr></hr>
      <div id="affiche">
        {films.length > 0 ? (
          films.map((film) => renderFilm(film))
        ) : (
          <p>Chargement des films/Séries ou aucun résultat...</p>
        )}
      </div>



    </div>
    

}

export default SagaFilm