
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useState ,useEffect } from "react";
import Button from '@mui/material/Button';
import Header from "../../../admin/components/Header";
import  {Link} from "react-router-dom";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useTheme } from "@mui/material";
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const Riwayat = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [riwayats, setRiwayat] = useState([]);

  useEffect(() => {
    getRiwayat();
  }, []);

  const getRiwayat = async () => {
    const dataRiwayatArray = []
    const response = await axios.get("http://localhost:5000/penawaranss");
    await response.data?.map(val => {
      val.id = val.id_penawaran
      dataRiwayatArray.push(val)
    })
    setRiwayat(dataRiwayatArray);
  };
  const columns = [
    {
      field: "nama_penawar",
      headerName: "Nama",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email_penawar",
      headerName: "Email",
      
      flex: 1,
    },
    {
      field: "nama_barang",
      headerName: "Nama Barang",
      flex: 1,
    },
    {
      field: "harga_awal",
      headerName: "Harga Awal",
      flex: 1,
    },
    {
      field: "harga_penawaran",
      headerName: "Penawaran Anda",
      flex: 1,
    },
    {
      field: "deskripsi",
      headerName: "Deskripsi",
      flex: 1,
    },
    {
      field: "gambar",
      headerName: "Gambar",
      width: 200,
      editable: true,
     renderCell: (params) => <img src={params.value} />
    },
  ];

  return (
    <Box m="20px">
      <Header
        title=""
        subtitle="&nbsp;"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={riwayats}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Riwayat;
