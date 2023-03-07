import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { useParams,useNavigate  } from 'react-router-dom';

export default function AlignItemsList() {
  const navigate = useNavigate();
  const [penawaran, setPenawaran] = useState([]);
  const [msg, seMsg] = useState("")
  const {id} = useParams();
  useEffect(() => {
    getPenawaran();
  }, [id]);
  const getPenawaran = async () => {
    const response = await axios.get(`http://localhost:5000/penawaran/${id}`);
    setPenawaran(response.data);
  };
  return (
    <>
    
    <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
      {penawaran.map((penawar, index) => (
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={penawar.tgl_penawaran}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               {penawar.nama_penawar} &nbsp;:  
              </Typography>
              &nbsp;
              Rp.{penawar.harga_penawaran}
              <hr />
            </React.Fragment>

          }
        />
      </ListItem>
      ))}
    </List>
    </>
  );
}