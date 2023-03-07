import React, { useState,useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate, useParams} from "react-router-dom";

const LelagEdit = () => {
  const [tgl_mulai, setTglMulai] = useState("");
  const [tgl_akhir, setTglAkhir] = useState("");
  const [nama, setNama] = useState("");
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
    
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getLelangById();
  }, [id]);
  const saveLelang = async (e) => {
    e.preventDefault();
    try {
        await axios.patch(`http://localhost:5000/lelang/${id}`, {
         tgl_mulai : tgl_mulai,
         tgl_akhir : tgl_akhir
        });
        swal("Barang Success Created!", "success")
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
      <h2 className="subtitle">Edit</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveLelang}>
              <p className="has-text-centered">{msg}</p>
              
              
              <div className="field">
                <label className="label">Nama Barang</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder=""
                    readOnly
                  />
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
                    Update
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

export default LelagEdit;
