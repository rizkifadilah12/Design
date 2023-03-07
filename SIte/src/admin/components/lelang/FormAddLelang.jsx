import React, { useState,useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert'; 
import { useNavigate} from "react-router-dom";

const FormAddLelang = () => {
  const [barangId, setBarangId] = useState("");
  const [tgl_mulai, setTglMulai] = useState("");
  const [tgl_akhir, setTglAkhir] = useState("");
  const [barangs, setBarangs] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getBarangs();
  }, []);

const getBarangs = async () => {
  const response = await axios.get("http://localhost:5000/barangs");
  setBarangs(response.data);
};
  const saveLelang = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/lelang", {
        barangId : barangId,
        tgl_mulai : tgl_mulai,
        tgl_akhir : tgl_akhir
      });
      swal("Lelang Success Created!", "success")
      navigate("/backend/lelang");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Lelang</h1>
      <h2 className="subtitle">Add New Lelang</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveLelang}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Barang</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={barangId}
                      onChange={(e) => setBarangId(e.target.value)}
                      >
                      {barangs.map((barang) =>(
                        <>
                      <option value={barang.id_barang}>{barang.nama_barang}</option>
                    
                        </>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Tanggal Mulai</label>
                <div className="control">
                  <input
                    type="date"
                    className="input"
                    value={tgl_mulai}
                    onChange={(e) => setTglMulai(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tanggal Ahir</label>
                <div className="control">
                  <input
                    type="date"
                    className="input"
                    value={tgl_akhir}
                    onChange={(e) => setTglAkhir(e.target.value)}
                    placeholder="NIP"
                  />
                </div>
              </div>
              
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddLelang;
