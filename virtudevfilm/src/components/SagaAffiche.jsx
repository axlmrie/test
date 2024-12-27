import React, { useEffect, useState } from 'react';
import SearchAppBar from './header'; 
import fetchData from '../function/fetchData';

function SagaAffiche() {
  const [films, setFilms] = useState([]);
  const [series,setSeries] = useState([]);

  const [saga,setSaga] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 

  useEffect(() => {

    const fetchSaga = async () => {
      const filmResponse = await getSaga();
      if (filmResponse) {
        setSaga(filmResponse); 
      }
    };

    
    const fetchToken = async () =>{
     await fetchData('POST','avis/hello')
    }
    
    fetchToken();
    fetchSaga();
  }, []);

  const getSaga = async () => {
    try {
      const response = await fetchData('GET','saga/getSaga','','',true);
      return await response;
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  };


  const renderFilm = (film) => {
    const url = `sagaFilm?id=${film.id}`;

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
      </div>
    </a>
  </li>
</ul>
    );
  };


  const filteredFilms = saga.filter((film) =>
    film.titre.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div>
      <h1>
        Sagas :
      </h1>
      <hr></hr>
      <div id="affiche">
        {filteredFilms.length > 0 ? (
          filteredFilms.map((film) => renderFilm(film))
        ) : (
          <p>Chargement des films/Séries ou aucun résultat...</p>
        )}
      </div>
    </div>
  );
};

export default SagaAffiche;
