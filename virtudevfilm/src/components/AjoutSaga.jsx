import React from "react";
import { useState } from "react";
import fetchData from "../function/fetchData";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AjoutSaga() {

    const [titreInput, setTitreInput] = useState('');
    const [afficheInput, setAfficheInput] = useState('');

    const createSerie = async() =>{
        const response = fetchData('POST','/saga/createSaga','',{'titre':titreInput,'image':afficheInput},true)
        console.log(response)
    }

    return(
        <div className='formulaireAjout'>
            <form >
              {/* Champ de texte */}
              <div>
                <TextField id="titreInput" value={titreInput} onChange={(e)=>setTitreInput(e.target.value)} required label="Titre :" variant='outlined'/>
              </div>
        
              {/* Textarea */}
              <div>
                <TextField id="afficheInput" value={afficheInput} onChange={(e)=> setAfficheInput(e.target.value)} required label="Url de l'affiche :" variant='outlined'/>
              </div>
        
              {/* Boutons */}
              <div className='btnAjout'>
              <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={createSerie} color='secondary'>Soumettre</Button>
              </Stack>
              </div>
            </form>
            </div>
            )
}
export default AjoutSaga