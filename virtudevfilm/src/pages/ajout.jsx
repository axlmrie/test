import '../App.css';
import { useEffect, useState } from 'react';
import SearchAppBar from '../components/header';
import Ajout from '../components/ajout';
import AjoutEpisode from '../components/ajoutEpisode';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AjoutSerie from '../components/ajoutSerie'
import AjoutSaga from '../components/AjoutSaga'

function Affiche() {
  const [choice,setChoice]= useState('')

  useEffect(() => {
    document.title = 'VirtudevFilm - Ajout';
    document.body.style.backgroundColor = '#282c34';
  }, []);

  const renderContent = () => {
    switch (choice) {
      case 'Film':
        return <Ajout/>;
      case 'Serie':
        return <AjoutSerie/>;
      case 'Episode':
        return <AjoutEpisode/>;
      case 'Saga':
        return <AjoutSaga/>;
      default:
        return <Ajout/>;
    }
  };


  return (
    <div className="App">
      <SearchAppBar showSearchBar={false} />
      <Stack spacing={2} direction="row" sx={{display: 'flex', justifyContent: 'center', marginTop:'10px' }}>
        <Button variant="contained" color={choice === 'Film' ? 'primary' : 'secondary'} onClick={()=>setChoice("Film")}>Film</Button>
        <Button variant="contained" color={choice === 'Saga' ? 'primary' : 'secondary'} onClick={()=>setChoice("Saga")}>Saga</Button>
        <Button variant="contained" color={choice === 'Serie' ? 'primary' : 'secondary'} onClick={()=>setChoice("Serie")}>Serie</Button>
        <Button variant="contained" color={choice === 'Episode' ? 'primary' : 'secondary'} onClick={()=>setChoice("Episode")}>Episode</Button>
      </Stack>
      <div style={{ marginTop: '20px' }}>
        {renderContent()}
      </div>

      
    </div>
  );
}

export default Affiche;
