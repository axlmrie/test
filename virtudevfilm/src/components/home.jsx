import React, { useEffect, useState } from 'react';
import SearchAppBar from './header'; // Importer la barre de recherche
import fetchData from '../function/fetchData'

const FilmComponent = () => {
  const [films, setFilms] = useState([]);
  const [series,setSeries] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // État pour la recherche

  useEffect(() => {
    const fetchFilms = async () => {
      const filmResponse = await getFilms();
      if (filmResponse) {
        setFilms(filmResponse.slice(-5)); // Ne garder que les 10 derniers films
      }
    };

    const fetchSerie = async () => {
      const serieResponse = await getSerie();
      if (serieResponse) {
        setSeries(serieResponse.slice(-5)); // Ne garder que les 10 derniers films
      }
    };
    
    const fetchToken = async () =>{
     await fetchData('POST','avis/hello')
    }
    
    fetchToken();
    fetchFilms();
    fetchSerie();
  }, []);

  const getFilms = async () => {
    try {
      const response = await fetchData('GET','film/getFilms','','',true);
      return await response;
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  };

  const getSerie = async () =>{
    try {
      const response = await fetchData('GET','serie/getSeries','','',true);
      return await response;
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  }

  const renderSerie = (serie) => {
    const url = `serie?id=${serie.id}`;

    return (
      <ul key={serie.id} className="film-container">
  <li style={{ listStyle: 'none', margin: 0, padding: 0 }}>
    <a href={url} className="film-link">
      <img
        src={serie.image}
        alt={`Affiche de ${serie.titre}`}
        width="250px"
        height="350px"
        className="film-image"
      />
      <div className="film-overlay">
        <p className="film-title">{serie.titre}</p>
      </div>
    </a>
  </li>
</ul>
    );
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

  // Fonction pour filtrer les films en fonction de la recherche
  const filteredFilms = films.filter((film) =>
    film.titre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSeries = series.filter((serie)=>serie.titre.toLowerCase().includes(searchQuery.toLocaleLowerCase()))

  return (
    <div>
      {/* Barre de recherche, on passe le setSearchQuery pour mettre à jour l'état */}
      <SearchAppBar setSearchQuery={setSearchQuery} showSearchBar={true} />
      <header className="App-header">
        Dernier Ajout :
      </header>
      <h1>
        Films :
      </h1>
      <hr></hr>
      <div id="affiche">
        {filteredFilms.length > 0 ? (
          filteredFilms.map((film) => renderFilm(film))
        ) : (
          <p>Chargement des films/Séries ou aucun résultat...</p>
        )}
      </div>
      <h1>Séries :</h1>
      <hr></hr>
      <div id="affiche">
        {filteredSeries.length > 0 ? (
          filteredSeries.map((serie) => renderSerie(serie))
        ) : (
          <p>Chargement des films/Séries ou aucun résultat...</p>
        )}
      </div>
    </div>
  );
};

export default FilmComponent;

