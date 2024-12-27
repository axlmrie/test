import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Code from './code';


const FormInscription = ({ handleSignUp }) => {
  const [isCode, setIsCode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSignUp(name, email, password, confirmPassword, setErrorMessage);
    if (!errorMessage) {
    }
    setIsCode(true);
  };



  return (
    <div>
      {isCode ? (
        <Code/>
      ) : (
        <div>
          <h2>Inscription</h2>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextField
                sx={{ input: { color: 'white' } }}
                id="name"
                color="secondary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                label="Nom"
                variant="outlined"
              />
            </div>

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

            <div className="form-group">
              <TextField
                sx={{ input: { color: 'white' } }}
                id="password"
                color="secondary"
                label="Mot de passe"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                variant="outlined"
              />
            </div>

            <div className="form-group-password">
              <TextField
                sx={{ input: { color: 'white' } }}
                id="confirm-password"
                color="secondary"
                label="Confirmer le mot de passe"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
                variant="outlined"
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <Stack spacing={2} direction="row" className="mui-btn">
              <Button variant="contained" color="secondary" type="submit">
                S'inscrire
              </Button>
            </Stack>
          </form>
        </div>
      )}
    </div>
  );
};

export default FormInscription;
