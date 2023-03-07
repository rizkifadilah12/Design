import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import axios from "axios";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {Link} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState ,useEffect } from "react";
import Header from "../Header";
import { useTheme, Button } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddIcon from '@mui/icons-material/Add';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
const BarangList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [barangs, setBarangs] = useState([]);
  const navigate = useNavigate();
  
  const handleButton = (barangId) => {
    console.log(barangId);
    swal({
      title: "Are you sure?",
      text: "Are You sure To Deleted This Item",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:5000/barang/${barangId}`);
        swal("Poof! Your Item  has been deleted!", {
          icon: "success",
        });
        navigate(0); 
      } else {
        swal("Your Item  is safe!");
      }
    });
  };


  useEffect(() => {
    getBarangs();
  }, []);

  const getBarangs = async () => {
    const dataBarangsArray = []
    const response = await axios.get("http://localhost:5000/barangs");
    await response.data?.map(val => {
      val.id = val.id_barang
      dataBarangsArray.push(val)
    })
    setBarangs(dataBarangsArray);
  };
  const columns = [

    {
      field: "nama_barang",
      headerName: "Nama Barang",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "harga_awal",
      headerName: "Harga Awal",
      type: "number",
      flex: 0.5,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "urlImage",
      headerName: "Gambar",
      width: 200,
      editable: true,
     renderCell: (params) => <img src={params.value} />
    },
    {
      field: "status",
      headerName: "Status",
   
    },
    {
      field: "Action",
      flex: 0.5,
      renderCell: (cellValues) => {
        return (
          <div>
            {cellValues?.row?.status !== 'process' && (  
          <div>
          <Button

          onClick={() => handleButton(cellValues.id)}>
            <DeleteIcon/>
          </Button>
          <Link
          to={`/backend/barang/edit/${cellValues.id}`}
                >
                  <ModeEditIcon/>
                </Link>
                <Link
            to={`/backend/barang/${cellValues.id}`}
                  >
                    <AddPhotoAlternateIcon/>
             
                  </Link>
          </div>
            )}
             {cellValues?.row?.status == 'process' && (
              <div>
           
            <Link
            to={`/backend/barang/${cellValues.id}`}
                  >
                    <AddPhotoAlternateIcon/>
             
                  </Link>
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
        title="Barang"
        subtitle="List of Barang for Future Reference"
      />
     <a href="/backend/barang/add" className="button is-success"><AddIcon/></a>
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
          rows={barangs}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default BarangList;
