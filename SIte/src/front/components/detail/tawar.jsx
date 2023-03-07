import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';

export default function Tawar() {
    const [harga_penawaran,setHarga] = useState();
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const savePenawaran = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:5000/penawaran", {
            harga_penawaran : harga_penawaran,
          });
          navigate(0); 
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <form onSubmit={savePenawaran}>
        <Stack direction="row" spacing={2}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Tawar</InputLabel>
          <OutlinedInput
          value={harga_penawaran}
          onChange={(e) => setHarga(e.target.value)}
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">IDR</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <Button type='submit'  endIcon={<SendIcon />}>
          Send
            </Button>
        </Stack>
        </form>
      </div>
    </Box>
  );
}