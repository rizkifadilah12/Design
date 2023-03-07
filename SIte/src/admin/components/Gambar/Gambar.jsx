
import { tokens } from "../../../theme";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import { useState ,useEffect } from "react";
import { useTheme, Button } from "@mui/material";

const GambarList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [gambars, setGambar] = useState([]);
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getGambar();
  }, []);

  const getGambar = async () => {
    const response = await axios.get(`http://localhost:5000/gambar/${id}`);
    setGambar(response.data);
  };
  const deleteBarang = async (barangid) => {
    await axios.delete(`http://localhost:5000/barang/${barangid}`);
    getGambar();
  };
  return (
    <div>
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>No</th>
          <th>Product Name</th>
          <th>Deskripsi</th>
          <th>Gambar</th>
          <th>Gambar</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {gambars.map((gambar, index) => (
          <tr key={gambar.id}>
            <td>{index + 1}</td>
            <td>{gambar.name}</td>
            {console.log(gambar)}
            <td>{gambar.deskripsi}</td>
            <td>{gambar.gambars.barangId}</td>
            <td> <img src={gambar.gambars[0].url} width="100px"/></td>
            <td>
              <button
                className="button is-small is-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default GambarList;
