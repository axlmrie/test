import React, { useState, useEffect } from 'react';
import fetchData from '../function/fetchData'
import SearchAppBar from './header'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NativeSelect from "@mui/material/NativeSelect";
import Stack from '@mui/material/Stack';





function Ajout () {

  const [inventaire, setInventaire] = useState([])
  const [saga, setSaga] = useState([])
  const [formInfo, setFormInfo] = useState({
    "titre": "",
    "image": "",
    "duree": "",   
    "video": "",  
    "idPublic": "",
    "categories": []
})



  




  useEffect(() => {
    const fetchToken = async () =>{
      await fetchData('POST','avis/hello')
    }
    
    fetchToken();
    getFilm()
    getSaga()

  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormInfo((prevEpisode) => ({
        ...prevEpisode,
        [name]: value
    }));
};
const handleChangeInfo = (name, value) => {

  setFormInfo((prevEpisode) => ({
      ...prevEpisode,
      [name]: value
  }));
};


  const getFilm = async () => {
    try {
      const res = await fetchData('GET', 'inventaire/getInventaire', '', '',true);


      const data = res;
      setInventaire(data);

    } catch (error) {
      console.error("Erreur lors de la récupération du film :", error);
    }
  };





  const updateFilm = async () => {
    try {
      await fetchData('POST', 'inventaire/updateInventaire', '', '');
      getFilm();  // Rafraîchir la liste des films après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour du film :", error);
    }
  };

  const getSaga = async () => {
    try {
      const res = await fetchData('GET', 'saga/getSaga', '', '',true);

      const data = res;
      console.log(data)

      setSaga(data);

    } catch (error) {
      console.error("Erreur lors de la récupération du film :", error);
    }
  };




  const createFilm = async () => {
    try {
      console.log(formInfo)
      if (formInfo) {

        // Envoyer la requête pour créer le film
        await fetchData('POST', 'film/createFilm', '', formInfo);
      }
      else {
        console.error("Aucun film sélectionné ou film introuvable !");
      }
    } catch (error) {
      console.error("Erreur lors de la création du film :", error);
    }
  };

  const infoPublic = async ()=>{
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${formInfo.idPublic}?api_key=68d9ff239b97275ec78f106b3d526bdb&language=fr-FR`
      );
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.Response === "False") {
        throw new Error(data.Error || "Film non trouvé.");
      }
      const genre = data.genres

      const heures = Math.floor(data.runtime / 60);
      const resteMinutes = data.runtime % 60;

      console.log(genre)
      console.log(data)
      handleChangeInfo("duree", heures + ":" + resteMinutes+":00")
      handleChangeInfo("titre", data.title)
      handleChangeInfo("image", ("https://image.tmdb.org/t/p/original" + data.poster_path))
      handleChangeInfo("categories", genre)

      console.log("Modification ok")
      return data;
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API :", error.message);
    }
    
  }


 

  return (
  
    <div className='formulaireAjout'>
    
    <form >
      {/* Select dynamique */}
      <div>
      <NativeSelect
                sx={{ color: "white" }}
                value={formInfo.video}
                defaultValue={"Sélectionnez un film"}
                autoWidth
                name='video'
                onChange={handleChange}
              >
                <option value="">Sélectionnez un film</option>
          {inventaire.map((film) => (
            <option key={film.id} value={film.chemain}>
              {film.chemain}
            </option>
          ))}
              </NativeSelect>
      </div>

     <div>
      <NativeSelect
                sx={{ color: "white" }}
                value={formInfo.saga}
                defaultValue={"Sélectionnez une Saga"}
                autoWidth
                name='saga'
                onChange={handleChange}
              >
                <option value="">Sélectionnez une Saga</option>
          {saga.map((saga) => (
            <option key={saga.id} value={saga.id}>
              {saga.titre}
            </option>
          ))}
              </NativeSelect>
      </div> 

      <div>
        <TextField
                  id="outlined-number"
                  label="Id Public"
                  type="number"
                  value={formInfo.idPublic}
                  placeholder="Id Public"
                  name='idPublic'
                  onChange={handleChange}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />      
        </div>

      {/* Boutons */}
      <div className='btnAjout'>
      <Stack spacing={2} direction="row">
         <Button variant="contained" onClick={infoPublic}  color='secondary'>Completer film</Button>{/*onClick={createFilm} */}
        <Button variant="contained" onClick={updateFilm} color='primary'>Rafraîchir</Button>
        <Button variant="contained" onClick={createFilm} color='primary'>Enregistrer</Button>
      </Stack>
      </div>
      
    </form>
    <ul>
      <li>Titre: {formInfo.titre}</li>
      <li>Image: {formInfo.image}</li>
      <li>Duree: {formInfo.duree}</li>
      <li>Catégorie: </li>
      {formInfo.categories.map((categorie)=>{
        return <li>{categorie.name}</li>
      })}
    </ul>
    </div>
  );
};

export default Ajout;
