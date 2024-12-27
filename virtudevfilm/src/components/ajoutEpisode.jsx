import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import fetchData from '../function/fetchData';
import NativeSelect from "@mui/material/NativeSelect";

function AjoutEpisode() {
    const [newEpisode, setNewEpisode] = useState({
        titre: "",
        image: "",
        video: "",
        serie: "",
        numero_episode: "",
        duree: ""
    });

    const [serieBdd, setSerieBdd] = useState([]);
    const [episodeBdd, setEpisodeBdd] = useState([]);

    useEffect(() => {
        getEpisode();
        getSerie();
    }, []);

    const handleChangeEpisode = (event) => {
        const { name, value } = event.target;

        setNewEpisode((prevEpisode) => ({
            ...prevEpisode,
            [name]: value
        }));
    };
    const handleChangeEpisodeDuree = (event) => {
        
        const { name, value } = event.target;


        const [chemain, duree] = value.split(',');
    
        console.log(chemain); 
        console.log(duree);   
        setNewEpisode((prevEpisode) => ({
            ...prevEpisode,
            video: chemain,
            duree: duree
        }));

    };

    const getEpisode = async () => {
        try {
            const res = await fetchData('GET', 'inventaireSerie/getInventaire', '', '', true);
            setEpisodeBdd(res);
        } catch (error) {
            console.error(error);
        }
    };

    const getSerie = async () => {
        try {
            const res = await fetchData('GET', 'serie/getSeries', '', '', true);
            setSerieBdd(res);
        } catch (error) {
            console.error(error);
        }
    };

    const updateEpisode = async () => {
        try {
            await fetchData('POST', 'inventaireSerie/updateInventaire', '', true);
            getEpisode();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'https://virtudev.ovh:8443/api/episode/createEpisode'; 
        let token = localStorage.getItem('bearerToken');
        const bodyData = {
            titre: newEpisode.titre,
            video: newEpisode.video, 
            image: newEpisode.image,  
            idSerie: newEpisode.serie,
            numeroEpisode: newEpisode.numero_episode,
            duree: newEpisode.duree
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bodyData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data); 
        } catch (err) {
            console.error('Error:', err);
        }
    }; 

    return (
        <form id="AjoutEpisode" onSubmit={handleSubmit}>
            <div className='formulaireAjout'>
                <TextField
                    id="titreInput"
                    value={newEpisode.titre}
                    onChange={handleChangeEpisode}
                    name="titre"
                    required
                    label="Titre :"
                    variant='outlined'
                />
            </div>
            <div>
                <NativeSelect
                    sx={{ color: "white" }}
                    value={[newEpisode.video ,newEpisode.duree]}
                    defaultValue=""
                    autoWidth
                    onChange={handleChangeEpisodeDuree}
                    name='video'
                >
                    <option value="">Sélectionnez un épisode</option>
                    {episodeBdd.map((episode) => (
                        <option key={episode.id} value={[episode.chemain, episode.duree]}>
                            {episode.chemain}
                        </option>
                    ))}
                </NativeSelect>
            </div>
            <div>
                <NativeSelect
                    sx={{ color: "white" }}
                    value={newEpisode.serie}
                    defaultValue=""
                    autoWidth
                    onChange={handleChangeEpisode}
                    name="serie"
                >
                    <option value="">Sélectionnez une série</option>
                    {serieBdd.map((serie) => (
                        <option key={serie.id} value={serie.id}>
                            {serie.titre}
                        </option>
                    ))}
                </NativeSelect>
            </div>
            <div>
                <TextField
                    id="afficheInput"
                    value={newEpisode.image}
                    onChange={handleChangeEpisode}
                    name="image"
                    required
                    label="Url de l'affiche :"
                    variant='outlined'
                />
            </div>
            <div>
                <TextField
                    label="Numéro d'épisode"
                    type="number"
                    variant="outlined"
                    onChange={handleChangeEpisode}
                    name='numero_episode'
                    value={newEpisode.numero_episode}
                />
            </div>
            <div>
                <Button variant="contained" type="submit" color="secondary">Save</Button>
                <Button variant="contained" onClick={() => { updateEpisode() }} color="secondary">Update</Button>
                <button type='button' onClick={() => { console.log(newEpisode) }}>Verif</button>
            </div>
        </form>
    );
}

export default AjoutEpisode;
