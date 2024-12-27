import SearchAppBar from "../components/header";
import SagaAffiche from '../components/SagaAffiche';
import React, { useEffect } from 'react';


function Saga() {
 
    useEffect(() => {
        document.title = 'VirtudevFilm - Saga';
        document.body.style.backgroundColor = '#282c34';
      }, []);

    return      <div className="App">
        <SearchAppBar showSearchBar={false}/>
        <SagaAffiche/>

    </div>
    

}

export default Saga