import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import swal from "sweetalert";
const AddGambar = () => {
  const [gambars, setGambar] = useState([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [idBarang, setIdBarang] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
console.log(gambars);

  useEffect(() => {
    getBarangById();
    getGambar();
  }, []);
 
  const handleButton = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are You sure To Delete This Image?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:5000/gambar/${id}`);
        swal("Poof! Your Item  has been deleted!", {
          icon: "success",
        });
        navigate(0); 
      } else {
        swal("Your Image  is safe!");
      }
    });
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };
  const getGambar = async () => {
    const response = await axios.get(`http://localhost:5000/gambar/${id}`);
    setGambar(response.data);
  };
  const getBarangById = async () => {
    const response = await axios.get(`http://localhost:5000/barang/${id}`);
    console.log(response.data.deskripsi);
    setName(response.data.name);
    setIdBarang(response.data.id)
  };

  const saveBarang = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", idBarang);
    try {
      await axios.post("http://localhost:5000/barangss", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      swal("Image Success Added!", "success")
      navigate(0); 
    } catch (error) {
      console.log(error);
    }
};
  return (
    <div>
      <h1 className="title">Barang</h1>
      <h2 className="subtitle">Add New Image</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveBarang}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Nama Barang</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    readOnly
                  />
                  <input
                    type="hidden"
                    className="input"
                    value={idBarang}
                    onChange={(e) => setName(e.target.value)}
                    readOnly
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
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>No</th>
          <th>Product Name</th>

          <th>Gambar</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
         {gambars.map((gambar, index) => (
          <tr key={gambar.id}>
            <td>{index + 1}</td>
            <td>{name}</td>
           

            <td> <img src={gambar.url} width="100px"/></td>
            <td>
              <button
                className="button is-small is-danger"
                onClick={() => handleButton(gambar.uuid)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    </div>
  );
};

export default AddGambar;
