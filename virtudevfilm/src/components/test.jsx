import React, { useState, useEffect } from 'react';
import fetchData from '../function/fetchData'
import SearchAppBar from './header'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NativeSelect from "@mui/material/NativeSelect";
import Stack from '@mui/material/Stack';
import { FormControl, InputLabel, Select, MenuItem, Chip, Box } from "@mui/material";

import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';


const Ajout = () => {
  // States pour les différents champs du formulaire
  const [titreInput, setTitreInput] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionSaga, setSelectedOptionSaga] = useState('');
  const [afficheInput, setAfficheInput] = useState('');
  const [numberInput, setNumberInput] = useState('');
  const [filmOptions, setFilmOptions] = useState([]); // État pour stocker les options du select
  const [sagaOptions, setSagaOptions] = useState([]); // État pour stocker les options du select
  const [filmData, setFilmData] = useState({
    duree: '',
    chemain: ''
  });
  const [categorie, setCategorie] = useState([{
    id: 0,
    nom: ''
  }]);
  const [selectedOptionsCategorie, setSelectedOptions] = useState([]);
  


  const handleChange = (event) => {
    setSelectedOptions(event.target.value);

  };

  // Gestion des soumissions du formulaire
  useEffect(() => {
    const fetchToken = async () =>{
      await fetchData('POST','avis/hello')
    }
    
    fetchToken();
    getFilm()
    getSaga()
    getCategorie()
  }, []);

  // Fonction pour récupérer les films
  const getFilm = async () => {
    try {
      const res = await fetchData('GET', 'inventaire/getInventaire', '', '',true);

      // Attendre que la réponse soit convertie en JSON
      const data = res;
      console.log(data)
      // Mettre à jour l'état avec les données pour les options du select
      setFilmOptions(data);

    } catch (error) {
      console.error("Erreur lors de la récupération du film :", error);
    }
  };

  const getSaga = async () => {
    try {
      const res = await fetchData('GET', 'saga/getSaga', '', '',true);

      const data = res;
      console.log(data)

      setSagaOptions(data);

    } catch (error) {
      console.error("Erreur lors de la récupération du film :", error);
    }
  };
  const getCategorie = async () => {
    try {
      const res = await fetchData('GET', 'categorie/getCategorie', '', '',true);

      const data = res;


      setCategorie(data);

    } catch (error) {
      console.error("Erreur lors de la récupération du film :", error);
    }
  };

  // Fonction pour mettre à jour les films et rafraîchir le select
  const updateFilm = async () => {
    try {
      await fetchData('POST', 'inventaire/updateInventaire', '', '');
      getFilm();  // Rafraîchir la liste des films après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour du film :", error);
    }
  };

  // Fonction pour créer un film en utilisant les données du film sélectionné
  const createFilm = async () => {
    try {
      // Trouver le film sélectionné par l'utilisateur à partir de filmOptions
      const selectedFilm = filmOptions.find(film => film.id === parseInt(selectedOption));

      const categorieRequest = []
      for (let i = 0; i < selectedOptionsCategorie.length; i++) {
        const selectedCategorieId = categorie.find(film => film.id === parseInt(selectedOptionsCategorie[i]));
        categorieRequest.push(selectedCategorieId)
      }

      if (selectedFilm) {
        const body = {
          titre: titreInput,
          image: afficheInput,
          duree: selectedFilm.duree,   // Utiliser la durée du film sélectionné
          video: selectedFilm.chemain,  // Utiliser le chemin du film sélectionné
          idPublic: numberInput,
          categories: categorieRequest

        };

        console.log("Corps de la requête pour createFilm:", body);

        // Envoyer la requête pour créer le film
        await fetchData('POST', 'film/createFilm', '', body);
      } else {
        console.error("Aucun film sélectionné ou film introuvable !");
      }
    } catch (error) {
      console.error("Erreur lors de la création du film :", error);
    }
  };

  // Utiliser useEffect pour récupérer les films lors du premier rendu du composant
 

  return (
  
    <div className='formulaireAjout'>
    
    <form >
      {/* Champ de texte */}
      <div>
        <TextField id="titreInput" value={titreInput} onChange={(e)=>setTitreInput(e.target.value)} required label="Titre :" variant='outlined'/>
      </div>

      {/* Select dynamique */}
      <div>
      <NativeSelect
                sx={{ color: "white" }}
                value={selectedOption}
                defaultValue={"Sélectionnez un film"}
                autoWidth
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="">Sélectionnez un film</option>
          {filmOptions.map((film) => (
            <option key={film.id} value={film.id}>
              {film.chemain} {/* Utilise le chemin comme nom du film */}
            </option>
          ))}
              </NativeSelect>
      </div>

      <div>
      <NativeSelect
                sx={{ color: "white" }}
                value={selectedOptionSaga}
                defaultValue={"Sélectionnez un film"}
                autoWidth
                onChange={(e) => setSelectedOptionSaga(e.target.value)}
              >
                <option value="">Sélectionnez une Saga</option>
          {sagaOptions.map((saga) => (
            <option key={saga.id} value={saga.id}>
              {saga.titre} {/* Utilise le chemin comme nom du film */}
            </option>
          ))}
              </NativeSelect>
      </div>

      {/* Textarea */}
      <div>
        <TextField id="afficheInput" value={afficheInput} onChange={(e)=> setAfficheInput(e.target.value)} required label="Url de l'affiche :" variant='outlined'/>
      </div>
                  <FormControl  sx={{ width: "300px" }}>
                  <InputLabel id="multi-select-label">Sélectionnez des options</InputLabel>
                  <Select
                    labelId="multi-select-label"
                    multiple
                    value={selectedOptionsCategorie}
                    onChange={handleChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {categorie.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
      <div>
        <TextField
                  id="outlined-number"
                  label="Id Public"
                  type="number"
                  value={numberInput}
                  placeholder="Id Public"
                  onChange={(e)=> setNumberInput(e.target.value)}
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
        <Button variant="contained" onClick={createFilm} color='secondary'>Soumettre</Button>
        <Button variant="contained" onClick={updateFilm} color='primary'>Rafraîchir</Button>
      </Stack>
      </div>
      
    </form>
    <button onClick={()=>{console.log(selectedOptionsCategorie)}} >test</button>
    </div>
  );
};

export default Ajout;
