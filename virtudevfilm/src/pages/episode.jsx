import React from "react";
import { useState,useEffect } from "react";
import SearchAppBar from "../components/header";
import Episode from "../components/episode";

const EpisodePage = () =>{
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const serie = urlParams.get('id');
    
  return(
    <div className="App">
      <SearchAppBar showSearchBar={false}/>
      <Episode serie={serie} />
    </div>
  )
}

export default EpisodePage