import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const Edit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [no_hp, setNoHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getMasyarakatById();
  }, []);

  const getMasyarakatById = async () => {
    const response = await axios.get(`http://localhost:5000/pass/${id}`);
    setName(response.data.nama);
    setEmail(response.data.email);
    setNoHp(response.data.no_hp);
    setAlamat(response.data.alamat);
  };
  
  
  const updateMasyarakat = async (e) => {
    e.preventDefault();
    try {
        await axios.patch(`http://localhost:5000/masyarakat/${id}`, {
         nama : name,
         email : email,
         no_hp: no_hp,
         alamat : alamat
        });
        navigate("/");
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
  };
  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={updateMasyarakat} className="box">
                <p className="has-text-centered">{msg}</p>
                <h1 className="title is-2">Update Data</h1>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                </div>
              
                <div className="field">
                  <label className="label">Nama</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">No Hp</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={no_hp}
                      onChange={(e) => setNoHp(e.target.value)}
                      placeholder="+62 **** **** ****"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Alamat</label>
                  <div className="control">
                  <textarea 
                  name="postContent"
                  rows={5} cols={43} 
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)} 
                   />
                  </div>
                </div>
                
                <div>
                </div>
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    Update
                  </button>
                 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Edit;
