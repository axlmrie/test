import React from "react"
import { useState,useEffect } from "react"
import fetchData from "../function/fetchData"

const Episode = ({serie}) => {
    const [series,setSeries] = useState([]);
    const [episodes,setEpisodes] = useState([]);

    useEffect(() => {
        if (serie) {
          getSerie();
        }

        if (series){
            getEpisodes()
        }
      }, [serie]);

    const getSerie = async () => {
        try {
          const res = await fetchData("GET", "serie/getSeriesById", serie,'',true); 
          setSeries(res)
          document.title = res.titre; 
        } catch (error) {
          console.error("Erreur lors de la récupération du film :", error);
        }
      }

      const getEpisodes = async () => {
        try {
          const resEpisode = await fetchData("GET", "episode/serie", serie ,'',true); 
          setEpisodes(resEpisode)
        } catch (error) {
          console.error("Erreur lors de la récupération de l'Episode :", error);
        }
      }

      const renderEpisode = (episodes) => {
        const url = `episode?id=${episodes.id}`;
    
        return (
            <ul key={episodes.id}>
            <li className="li-style" style={{ listStyle: 'none', marginBottom:0 , padding: 0 }}>
              <a href={url} style={{ display: 'flex', alignItems: "center",height : "100px",textDecoration : "none",color:"inherit",justifyContent: "space-evenly"}}>
                <img
                  src={episodes.image}
                  alt={`Affiche de ${episodes.titre}`}
                  style={{ height: '100%', width: 'auto', objectFit: 'cover' }}
                  className="film-image"
                />
                <div className="film-info" style={{ flex: 1, backgroundColor: 'secondary', padding: '10px' }}>
                  <p className="film-title" style={{ margin: '0', fontWeight: 'bold' }}>
                    {episodes.numeroEpisode} - {episodes.titre}
                  </p>
                  <p>{episodes.duree}</p>
                </div>
              </a>
            </li>
          </ul>
        );
      };

    return(
        <>
 <div className="headerEpisode">
    <div>
        <div className="imgSerie">
        <img
        src={series.image}
        alt={`Affiche de ${series.titre}`}
        width="250px"
        height="350px"
        className="film-image"
      />
        </div>
    </div>
    <div>
        <div className="titre">{series.titre}</div>
    </div>
 </div>
 <div>
 {episodes ? (
          episodes.map((episode) => renderEpisode(episode))
        ) : (
          <p>Chargement des épisodes ou aucun résultat...</p>
        )}
 </div>
 </>
    )
}

export default Episode

