import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Login from './pages/login';
import AfficheFilmPage from './pages/AfficheFilmPage';
import Home from "./pages/home";
import Ajout from './pages/ajout';
import Film from './pages/film';
import Compte from './pages/Compte';
import SagaFilm from './pages/SagaFilm';
import Saga from './pages/Saga';
import EpisodePage from './pages/episode';
import EpisodeLecteur from './pages/episodeLecteur';
import theme from './components/theme';
import { ThemeProvider } from '@mui/material/styles';


const router = createBrowserRouter([
  
  {path: "/",
    element: <Login/>},
    
  {path : "/home",
  element : <Home/>},
  
  {path : "/AfficheFilm",
  element : <AfficheFilmPage/>},

  {path : "/ajout",
  element : <Ajout/>},

  {path : "/film",
  element : <Film/>},

  {path : "/saga",
    element : <Saga/>},

  {path:"/serie",
    element:<EpisodePage/>},

  {path:"/episode",
    element:<EpisodeLecteur/>},

  {path:"/compte",
      element:<Compte/>},

  {path:"/sagaFilm",
      element:<SagaFilm/>}
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);


reportWebVitals();