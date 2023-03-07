
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useState ,useEffect } from "react";
import Header from "../Header";
import { useTheme } from "@mui/material";


const PenawaranList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Penawarans, setPenawaran] = useState([]);

  useEffect(() => {
    getPenawaran();
  }, []);

  const getPenawaran = async () => {
    const dataPenawaranArray = []
    const response = await axios.get("http://localhost:5000/penawarans");
    console.log(response);
    await response.data?.map(val => {
      val.id = val.id_penawaran
      dataPenawaranArray.push(val)
    })
    setPenawaran(dataPenawaranArray);
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
      field: "no_hp",
      headerName: "No Hp",
      flex: 1,
    },
    {
      field: "nama_barang",
      headerName: "Barang Lelang",
      flex: 1,
    },
    {
      field: "harga_awal",
      headerName: "Harga Awal",
      flex: 1,
    },
    {
      field: "harga_penawaran",
      headerName: "Harga Penawaran",
      flex: 1,
    }
  ];

  return (
    <Box m="20px">
      <Header
        title="Penawaran"
        subtitle="List of Penawaran for Future Reference"
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
          rows={Penawarans}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default PenawaranList;
