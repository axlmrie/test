import React, { useState, useEffect } from "react";
import VideoPlayer from "../components/film";
import fetchData from "../function/fetchData";
import SearchAppBar from "../components/header";

const EpisodeLecteur = () => {
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const episode = parseInt(urlParams.get('id')); // Récupération de l'ID de l'épisode à partir des paramètres de l'URL
  const [source, setSource] = useState(''); 
  const [nextSource, setNextSource] = useState(''); 
  const [titre, setTitre] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = '#282c34';
    if (episode) {
      getEpisode();
      getNextEpisode();
    }
  }, [episode]);

  const getEpisode = async () => {
    try {
      const res = await fetchData("GET", "episode", episode, "", true);
      if (res && res.video) {
        const video = res.video;
        setTitre(res.titre);
        setSource(`https://virtudev.ovh/serieEp/${video}`);
        document.title = res.titre;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'épisode :", error);
    }
  };

  const getNextEpisode = async () => {
    try {
      const nextEpisodeId = episode + 1; // Incrémente l'ID pour récupérer le prochain épisode
      const res = await fetchData("GET", "episode", nextEpisodeId, "", true);
      if (res && res.video) {
        const video = res.video;
        setNextSource(`https://virtudev.ovh/serieEp/${video}`);
      } else {
        setNextSource(''); // Si aucun prochain épisode, vide la source
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'épisode suivant :", error);
    }
  };

  const nextEpisodeBtn = (event) => {
    event.preventDefault();
    if (nextSource) {
      // Rediriger vers la page de l'épisode suivant en mettant à jour l'URL
      window.location.href = `?id=${episode + 1}`;
    }
  };

  return (
    <div className="App">
      <SearchAppBar showSearchBar={false} />
      <VideoPlayer source={source} titre={titre} />
      {nextSource && (
        <button type="button" onClick={nextEpisodeBtn}>
          Episode Suivant
        </button>
      )}
    </div>
  );
};

export default EpisodeLecteur;
