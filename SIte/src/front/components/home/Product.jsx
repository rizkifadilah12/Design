import Banner from "../global/Banner";
import ScrollToTopOnMount from "../global/Scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useState, useEffect } from "react";
import axios from "axios";
function Product() {
    const [product, setProduct] = useState([]);
    const [filter, setFilter] = useState("");
    console.log(filter);
    const searchText = (e) => {
      setFilter(e.target.value)
    }
    let dataSearch = product.filter(item => {
      return Object.keys(item).some(key=> 
          item[key]?.toString().toLowerCase().includes(filter.toString().toLowerCase())
        )
    })
    
    useEffect(() => {
        getBarangs();
      }, []);
    
    
      const getBarangs = async () => {
        const dataBarangsArray = []
        const response = await axios.get("http://localhost:5000/lelang");
        await response.data?.map(val => {
          val.id = val.id_barang
          dataBarangsArray.push(val)
        })
        setProduct(dataBarangsArray);
      };
  return (
    <>
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch', left:"550px"},
      }}
      noValidate
      autoComplete="on"
    >
      <TextField
        id="outlined-controlled"
        label="Seacrh Product"
        value={filter}
        onChange={searchText.bind(this)}
      />
      </Box>
      </div>
      <h2 className="text-muted text-center mt-4 mb-3">New Arrival</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          {dataSearch.slice(0,9).map((value) => (
        <div className="col">
        <div className="card shadow-sm">
        <img
          className="card-img-top bg-dark cover "
          height="240"
          width="150"
          alt=""
          src={value.gambar}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{value.nama_barang}</h5>
          <p className="card-text text-center text-muted">{value.harga_awal}</p>
          <div className="d-grid gap-2">
          <Link
className="btn btn-outline-dark"
to={`/detail/${value.id_lelang}`}>
      Detail
      </Link>
          </div>
        </div>
      </div>
    </div>
          ))}
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="!#" className="me-3">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="!#">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
          <a href="!#" className="ms-3">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Product;
