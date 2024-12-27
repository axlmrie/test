import React, { useState, useEffect } from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MovieIcon from '@mui/icons-material/Movie';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import fetchData from '../function/fetchData';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({ setSearchQuery, showSearchBar }) {
  const theme = useTheme(); // Accéder au thème Material-UI pour récupérer les couleurs

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const admin = localStorage.getItem("admin");



  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    const fetchToken = async () =>{
      await fetchData('POST','avis/hello')
    }
    
    fetchToken();
  }, []);

  const list = () => (
    <Box
      sx={{ width: 250, backgroundColor: theme.palette.primary.main, height: '100%', color: 'white' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => window.location.href = 'home'}>
          <ListItemIcon>
            <HomeIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button onClick={() => window.location.href = 'afficheFilm'}>
          <ListItemIcon>
            <MovieIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Films" />
        </ListItem>

        {admin === "ADMINISTRATEUR" && (
        <ListItem button onClick={() => window.location.href = 'ajout'}>
          <ListItemIcon>
            <AddCircleOutlineIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Ajout" />
        </ListItem>
      )}

        <ListItem button onClick={() => window.location.href = 'Saga'}>
          <ListItemIcon>
            <AccountCircleIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Saga" />
        </ListItem>


        <ListItem button onClick={() => window.location.href = 'compte'}>
          <ListItemIcon>
            <AccountCircleIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Compte" />
        </ListItem>

        <ListItem button onClick={() => {
          fetchData("POST","user/deconnexion",'','',true)
          localStorage.removeItem('bearerToken');
          localStorage.removeItem('RefreshToken');
          window.location.href = '/';
        }}>
          <ListItemIcon>
            <ExitToAppIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Déconnexion" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            VirtuDev Film
          </Typography>
          {showSearchBar && ( // Ajout de la condition pour afficher la barre de recherche
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchChange}
              />
            </Search>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </Box>
  );
}

