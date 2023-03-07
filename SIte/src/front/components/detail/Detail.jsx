import React from 'react'
import ScrollToTopOnMount from '../global/Scroll';
import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
import axios from 'axios';
import AlignItemsList from './Penawaran';
import { useParams,useNavigate  } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';


import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
const Detail = () => {
    const [tgl_mulai, setTglMulai] = useState("");
    const [tgl_akhir, setTglAkhir] = useState("");
    const [nama, setNama] = useState("");
    const [harga, setHargaAwal] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [gambar, setGambar] = useState("");
    const [harga_penawaran,setHarga] = useState();
    const [penawar, setNamaPenawar] = useState([]);
    const [lelangId,setlelangId] = useState("");
    const [hargaTinggi, setHargaraTinggi] = useState("");
    const [total,setTotal] = useState();
    const [barangId,setBarangId] = useState("");
    const [img,setImg] = useState([]);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        const getLelangById = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/lelang/${id}`);
            setNama(response.data[0].nama_barang);
            setTglMulai(response.data[0].tgl_mulai);
            setTglAkhir(response.data[0].tgl_akhir)
            setHargaAwal(response.data[0].harga_awal)
            setDeskripsi(response.data[0].deskripsi)
            setBarangId(response.data[0].id_barang)
            setGambar(response.data[0].gambar)
            setlelangId(response.data[0].id_lelang)
        
          } catch (error) {
            if (error.response) {
              setMsg(error.response.data.msg);
            }
          }
        };
        getLelangById();
      }, [id]);
      useEffect(() => {
        getPenawaran();
      }, [id]);
      useEffect(() => {
        if(barangId != ""){
          getGambar();
        }
      }, [barangId]);
    const getPenawaran = async () => {
      const response = await axios.get(`http://localhost:5000/penawaran/${id}`);

      setNamaPenawar(response.data);
    };
    useEffect(() => {
      const getLelang = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/lelangDetail/${id}`);
          setHargaraTinggi(response.data[0].harga_tertinggi);
          setTotal(response.data[0].total_penawaran);
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      };
      getLelang();
    }, [id]);
    const getGambar = async () => {
      const Id = barangId
      const response = await axios.get(`http://localhost:5000/gambars/${Id}`);
      setImg(response.data);
    };
    const savePenawaran = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:5000/penawaran", {
          harga_penawaran : harga_penawaran,
          lelangId : lelangId
        });
        navigate(0); 
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
  return (
  <>
  
  <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount/>
      <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link className="text-decoration-none link-secondary" to="/">
              All Prodcuts
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {nama}
          </li>
        </ol>
      </nav>
          <p className="has-text-centered">{msg}</p>
      <div className="row mb-4">
        <div className="d-none d-lg-block col-lg-1">
          <div className="image-vertical-scroller">
            
            <div className="d-flex flex-column">
            {img?.map((img, i) => {     
                let selected = i !== 1 ? "opacity-6" : "";
                return (
                  <a key={i} href="#">
                    <img
                      className={"rounded mb-2 ratio " + selected}
                      alt=""
                      src={img.url}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-12 mb-4">
              <img
                className="border rounded ratio ratio-1x1"
                alt=""
                src={gambar}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="d-flex flex-column h-100">
            <h2 className="mb-1">{nama}</h2>
            <h4 className="text-muted mb-4">Rp. {harga}</h4>
            <h4 className="mb-0">Details</h4>
            <hr />
            <dl className="row">
              <dt className="col-sm-4">Peridode</dt>
              <dd className="col-sm-8 mb-3">{tgl_mulai} Sampai {tgl_akhir}</dd>
            </dl>

            <h4 className="mb-0">Description</h4>
            <hr />
            <p className="lead flex-shrink-0">
              <small>
               {deskripsi}
              </small>
            </p>
            <Alert severity="info">Harga Tertinggi Rp.{hargaTinggi} / Total Penawaran {total}</Alert>
            <hr />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <form onSubmit={savePenawaran}>
        <Stack direction="row" spacing={2}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Tawar</InputLabel>
          <OutlinedInput
          value={harga_penawaran}
          onChange={(e) => setHarga(e.target.value)}
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">IDR</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <Button type='submit'  endIcon={<SendIcon />}>
          Send
            </Button>
        </Stack>
        </form>
      </div>
    </Box>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 mb-4">
          <hr />
          <h4 className="text-muted my-4">Penawaran Barang</h4>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
            <AlignItemsList/>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Detail