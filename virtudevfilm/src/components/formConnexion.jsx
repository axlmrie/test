
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const FormConnexion = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password, setErrorMessage);
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <TextField
            sx={{ input: { color: 'white' } }}
            id="email"
            color="secondary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            label="Email"
            variant="outlined"
          />
        </div>

        <div className="form-group-password">
          <TextField
            sx={{ input: { color: 'white' } }}
            id="password"
            color="secondary"
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            variant="outlined"
            endAdornment={
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <Stack spacing={2} direction="row" className="mui-btn">
          <Button variant="contained" color="secondary" type="submit">
            Se connecter
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default FormConnexion;
