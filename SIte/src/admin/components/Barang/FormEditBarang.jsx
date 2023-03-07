import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import swal from "sweetalert";

const FormEditBarang = () => {
  const [name, setName] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga_awal, setHargaAwal] = useState("");
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getBarangById();
  }, []);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };
  const getBarangById = async () => {
    const response = await axios.get(`http://localhost:5000/barang/${id}`);
    setName(response.data.name);
    setDeskripsi(response.data.deskripsi);
    setHargaAwal(response.data.harga_awal);
    setFile(response.data.gambars[0].image);
    setPreview(response.data.gambars[0].url);
  };
  
  
  const UpdateBarang = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name); 
    formData.append("deskripsi", deskripsi); 
    formData.append("harga_awal", harga_awal); 
    try {
      await axios.patch(`http://localhost:5000/barang/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/backend/barang");
      swal("Barang Success Updated!", "success")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="title">Barang</h1>
      <h2 className="subtitle">Add New Barang</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={UpdateBarang}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Nama Barang</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Barang"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Deskripsi</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Deskripsi"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Harga Awal</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={harga_awal}
                    onChange={(e) => setHargaAwal(e.target.value)}
                    placeholder="Harga Awal"
                  />
                </div>
              </div>
              <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    onChange={loadImage}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview ? (
            <figure className="image is-128x128">
              <img src={preview} alt="Preview Image" />
            </figure>
          ) : (
            ""
          )}
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

export default FormEditBarang;
