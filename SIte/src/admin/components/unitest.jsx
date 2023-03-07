import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import { useState ,useEffect } from "react";
import Header from "../../admin/components/Header";
import { useTheme } from "@mui/material";

const UniTest = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const dataUsersArray = []
    const response = await axios.get("http://localhost:5000/barangs");
    await response.data?.map(val => {
      val.id = val.id_barang
      dataUsersArray.push(val)
    })
    setUsers(dataUsersArray);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };
//   const data = []
//     for (let index = 0; index < event.length; index++) {
//         idevent.push(event[index].id);
//     }
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "nama_barang",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "harga_awal",
      headerName: "Harga Awal",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "gambar",
      headerName: "Gambar",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
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
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default UniTest;
