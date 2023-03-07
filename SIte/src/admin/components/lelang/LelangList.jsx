
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
import AddIcon from '@mui/icons-material/Add';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const LelangList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [lelangs, setLelang] = useState([]);

  useEffect(() => {
    getLelangs();
  }, []);
  const handleButtonCancel = (lelangId) => {
    swal({
      title: "Are you sure?",
      text: "Are You sure To Canceled This Lelang?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.patch(`http://localhost:5000/lelang/cancel/${lelangId}`);
        swal("Poof! Your Lelang  has been Canceled!", {
          icon: "success",
        });
        navigate(0); 
      } else {
        swal("Your lelang  is safe!");
      }
    });
  };
  const handleButtonClosed = (lelangId) => {
    swal({
      title: "Are you sure?",
      text: "Are You sure To Closed This Lelang?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.patch(`http://localhost:5000/lelang/closed/${lelangId}`);
        swal("Poof! Your Lelang  has been Closed!", {
          icon: "success",
        });
        navigate(0); 
      } else {
        swal("Your lelang  is safe!");
      }
    });
  };
  const getLelangs = async () => {
    const dataLelangArray = []
    const response = await axios.get("http://localhost:5000/lelangs");
    await response.data?.map(val => {
      val.id = val.id_lelang
      dataLelangArray.push(val)
    })
    setLelang(dataLelangArray);
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
    },{
      field: "Action",
      flex: 1.3,
      renderCell: (cellValues) => {
        return (
         <div>
          {cellValues?.row?.status !== 'open' && ( 
            <h1>-</h1>
           )}
            <div>
          {cellValues?.row?.status === 'open' && (
            <div>
          <Link
          to={`/backend/lelang/edit/${cellValues.id}`}>
                  <ModeEditIcon/>
                </Link>
          <Button
          color="primary"
          onClick={() => handleButtonCancel(cellValues.row.id)}>
            <NotInterestedIcon fontSize="smal" />
          </Button>
          <Button
          color="primary"
          onClick={() => handleButtonClosed(cellValues.row.id)}>
            <HighlightOffIcon fontSize="smal"/>
          </Button>
          </div>
           )}
          </div>
          
          </div>
        )
      }
    }
  ];

  return (
    <Box m="20px">
      <Header
        title="Lelang"
        subtitle="List of lelang for Future Reference"
      />
      <a href="/backend/lelang/add" className="button is-success"><AddIcon/></a>
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

export default LelangList;
