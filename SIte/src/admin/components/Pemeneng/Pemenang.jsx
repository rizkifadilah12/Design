import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useState ,useEffect } from "react";
import Header from "../Header";
import { useTheme } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';


const PemenangL = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Pemenangs, setPemenang] = useState([]);
  
  
  useEffect(() => {
    getPemenang();
  }, []);
  const confirm = async (id) => {
    await axios.patch(`http://localhost:5000/lelang/confirm/${id}`);
    getPemenang();
  }
  const getPemenang = async () => {
    const dataPemenangnArray = []
    const response = await axios.get("http://localhost:5000/lelangss");
    await response.data?.map(val => {
      val.id = val.id_lelang
      dataPemenangnArray.push(val)
    })
    setPemenang(dataPemenangnArray);
  };
  const columns = [
    {
      field: "nik",
      headerName: "NIK",
      flex: 1,
      cellClassName: "name-column--cell",
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
      field: "no_hp",
      headerName: "No Hp",
      flex: 1,
    },
    {
      field: "alamat",
      headerName: "Alamat",
      flex: 1,
    },
    {
      headerName: "Periode",
      flex: 1,
      renderCell:(cellValues) => {
        return(
        <p>{cellValues.row.tgl_mulai} -
         {cellValues.row.tgl_akhir}</p>
        )
      }
    },{
      field: "nama_barang",
      headerName : "Barang",
    },{
      field : "harga_awal",
      headerName: "Harga Awal"
    },{
      field : "harga_akhir",
      headerName : "Harga Akhir"
    },{
      field : "status",
      headerName : "Status"
    },{
      field : "action",
      headerName: "Action",
      renderCell: (cellValues) => {
        return (
          <div>
            {cellValues?.row?.status !== 'Unconfirmed' && (  
          <h1>-</h1>
            )}
             {cellValues?.row?.status == 'Unconfirmed' && (
              <div>
           
           <Button
          color="primary"
          onClick={() => confirm(cellValues.row.id)}>
           <CheckIcon/>
          </Button>
              </div>
             )}
             
          </div>
        )
      }
    }
  ];

  return (
    <Box m="20px">
      <Header
        title="Pemenang Lelang"

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
          rows={Pemenangs}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default PemenangL;
