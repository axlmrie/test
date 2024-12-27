import React, { useEffect, useState } from 'react';
import SearchAppBar from './header'; // Importer la barre de recherche
import { Chip, Box, Typography, Grid } from '@mui/material';
import fetchData from '../function/fetchData';

const AfficheFilm = () => {
  const [films, setFilms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFilms = async () => {
      const filmResponse = await getFilms();
      filmResponse.forEach(element => {
        console.log(element.categories)
      });
      console.log("Films récupérés :", filmResponse); // Vérifie ici les données

      if (filmResponse) {
        setFilms(filmResponse);

        const uniqueCategories = [
          ...new Set(
            filmResponse.flatMap((film) =>
              (film.categories && film.categories.length > 0
                ? film.categories
                : ["non catégorisé"]
              ).map((category) => category.nom)
            )
          ),
        ];

        console.log("Catégories uniques :", uniqueCategories); // Vérifie les catégories extraites
        setCategories(uniqueCategories);
      }
    };

    fetchFilms();
  }, []);

  const getFilms = async () => {
    try {
      const response = await fetchData('GET', 'film/getFilms', '', '', true);
      return await response;
    } catch (error) {
      console.error('Erreur lors de la récupération des films :', error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const filteredFilms = films
    .filter((film) =>
      selectedCategory
        ? film.categories &&
          film.categories.some((category) => category.nom === selectedCategory)
        : true
    )
    .filter((film) =>
      film.titre.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div>
      <SearchAppBar setSearchQuery={setSearchQuery} showSearchBar={true} />
      <Box sx={{ padding: 2, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', color : "inherit", '.MuiChip-label':{backgroundColor : "transparent",color:"white"}}}>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.charAt(0).toUpperCase() + category.slice(1)} // Capitaliser pour l'affichage
            onClick={() => handleCategorySelect(category)}
            color={selectedCategory === category ? 'secondary' : 'primary'}
          />
        ))}
      </Box>
      <h1>Films :</h1>
      <hr />
      <div id="affiche">
        {filteredFilms.length > 0 ? (
          <Grid container spacing={2}>
            {filteredFilms.map((film) => (
              <Grid item xs={6} sm={4} md={3} key={film.id}>
                <ul className="film-container">
                  <li style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    <a href={`film?id=${film.id}`} className="film-link">
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
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>Chargement des films ou aucun résultat...</p>
        )}
      </div>
    </div>
  );
};

export default AfficheFilm;
