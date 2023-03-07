
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useState ,useEffect } from "react";
import Header from "../../../admin/components/Header";

import { useTheme } from "@mui/material";


const RiwayatMenang = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [menangs, setMenang] = useState([]);

  useEffect(() => {
    getMenangs();
  }, []);

  const getMenangs = async () => {
    const dataMenangArray = []
    const response = await axios.get("http://localhost:5000/pemenanguser");
    await response.data?.map(val => {
      val.id = val.id_lelang
      dataMenangArray.push(val)
    })
    setMenang(dataMenangArray);
  };
  const columns = [
    {
      field: "tgl_mulai",
      headerName: "Star At",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "tanggal_akhir",
      headerName: "End At",
      
      flex: 1,
    },
    {
      field: "pemenang",
      headerName: "Nama",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "alamat",
      headerName: "Alamat",
      flex: 1,
    },
    {
      field: "nama_barang",
      headerName: "Nama Barang",
      flex: 1,
    },
    {
      field: "deskripsi",
      headerName: "Deskripsi"
    },
    {
      field: "harga_awal",
      headerName: "Harga Awal"
    },
    {
      field: "harga_Akhir",
      headerName: "Harga Akhir"
    },
    {
      field: "status",
      headerName: "Status"
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
          rows={menangs}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default RiwayatMenang;
