import '../App.css';
import { useEffect } from 'react';
import AfficheFilm from '../components/AfficheFilm';

function AfficheFilmPage() {

  useEffect(() => {
    document.title = 'VirtudevFilm - Film';
    document.body.style.backgroundColor = '#282c34';
  }, []);


  return (
    <div className="App">
      
      <AfficheFilm/>
    </div>
  );
}

export default AfficheFilmPage;

