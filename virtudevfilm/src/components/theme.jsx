import { createTheme, ThemeProvider } from '@mui/material/styles';

// Créer un thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: '#676f9d', // Exemple de couleur principale
    },
    secondary: {
      main: '#f9b17a', // Exemple de couleur secondaire
    },
    background: {
      default: '#2d3250', // Couleur de fond par défaut
    },
    text: {
      primary: '#000000', // Couleur du texte principal
      secondary: '#ffffff', // Couleur du texte secondaire
    },
  },
});

export default theme;

