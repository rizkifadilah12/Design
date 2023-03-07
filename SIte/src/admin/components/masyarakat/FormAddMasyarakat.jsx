import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddMasyarakat = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [jk, setJk] = useState("");
  const [no_hp, setNoHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/masyarakat", {
        email: email,
        password: password,
        nik: nik,
        nama: nama,
        jk: jk,
        no_hp: no_hp,
        alamat: alamat
      });
      navigate("/masyarakat");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Masyarakat</h1>
      <h2 className="subtitle">Add New Masyarakat</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveUser}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Nik</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    placeholder="NIK"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="******"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Jenis Kelamin</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={jk}
                      onChange={(e) => setJk(e.target.value)}
                    >
                      <option value="laki-laki">Laki-Laki</option>
                      <option value="perempuan">Perempuan</option>
                    </select>
                  </div>
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
                    placeholder="+62 **** **** *****"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Alamat</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    placeholder=""
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

export default FormAddMasyarakat;
