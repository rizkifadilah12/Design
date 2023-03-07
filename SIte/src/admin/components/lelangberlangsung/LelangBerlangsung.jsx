
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useState ,useEffect } from "react";
import Button from '@mui/material/Button';
import Header from "../Header";
import  {Link} from "react-router-dom";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useTheme } from "@mui/material";
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const LelangBList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [lelangs, setLelang] = useState([]);

  useEffect(() => {
    getLelangs();
  }, []);

  const getLelangs = async () => {
    const dataLelangArray = []
    const response = await axios.get("http://localhost:5000/lelang");
    await response.data?.map(val => {
      val.id = val.id_lelang
      dataLelangArray.push(val)
    })
    setLelang(dataLelangArray);
  };
  const cancel = async (id) => {
    await axios.patch(`http://localhost:5000/lelang/cancel/${id}`);
    getLelangs();
  };
  const closed = async (id) => {
    await axios.patch(`http://localhost:5000/lelang/closed/${id}`);
    getLelangs();
  };
  const columns = [
    {
      field: "tgl_mulai",
      headerName: "Tanggal Mulai",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "tgl_akhir",
      headerName: "Tanggal Akhir",
      
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
      field: "harga_akhir",
      headerName: "Penawaran",
      flex: 1,
    },
    {
      field: "penanggungjawab",
      headerName: "Penanggung Jawab",
      flex: 1,
    },
    {
      field: "pemenang",
      headerName: "Penawar",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    }
  ];

  return (
    <Box m="20px">
      <Header
        title="Lelang Berlangsung"
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
          rows={lelangs}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default LelangBList;
