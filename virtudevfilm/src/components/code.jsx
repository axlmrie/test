
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import fetchData from '../function/fetchData';


const Code = () => {
  const [code, setCode] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleCode(code);
  };

  const handleCode = async (code) => {
    const response = await fetchData('POST','/user/activation','',{"code":code},false)
    window.location.href='/'
  };

  return (
    <div>
      <h2>Code de confirmation</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <TextField
            sx={{ input: { color: 'white' } }}
            id="code"
            color="secondary"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            label="Code"
            variant="outlined"
          />
        </div>
        <Stack spacing={2} direction="row" className="mui-btn">
          <Button variant="contained" color="secondary" type="submit">
            Valider le code
          </Button>
        </Stack>
      </form>

    </div>
  );
};

export default Code;
