import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./admin/components/Login";
import Users from "./admin/pages/users/Users";
import Masyarakat from "./admin/pages/Masyarakats/Masyarakat";
import EditBarang from "./admin/pages/Barang/EditBarang";
import AddMasyarakat from "./admin/pages/Masyarakats/AddMasyarakat"; 
import Barang from "./admin/pages/Barang/Barang";
import Dashboard from "./admin/pages/Dashboard";
import AddBarang from "./admin/pages/Barang/AddBarang";
import AddUser from "./admin/pages/users/AddUser";
import EditUser from "./admin/pages/users/EditUser";
import Penawaran from "./admin/pages/penawaran/Penawaran";
import Pemenang from "./admin/pages/Pemenang/Pemenang";
import EditLelang from "./admin/pages/Lelang/EditLelang";
import Loginfront from "./front/components/auth/login";
import Register from "./front/components/auth/register";
import Lelang from "./admin/pages/Lelang/Lelang"
import AddLelang from "./admin/pages/Lelang/AddLelang";
import DashboardFront from "./front/pages/home/Dashboard";
import Details from "./front/pages/Details/Detail";
import Gambar from "./admin/pages/Barang/Gambar";
import RiwayatPenawaran from "./front/pages/Riwayat/Penawaran";
import Menang from "./front/pages/Riwayat/Menang";
import EditMas from "./front/pages/Details/edit";
function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          //baackend route  
          <Route path="/backend" element={<Login />} />
          <Route path="/backend/lelang/add" element={<AddLelang />} />
          <Route path="/backend/lelang/edit/:id" element={<EditLelang />} />
          <Route path="/backend/penawaran" element={<Penawaran />} />
          <Route path="/backend/lelang" element={<Lelang />} />
          <Route path="/backend/pemenang" element={<Pemenang />} />
          <Route path="/backend/dashboard" element={<Dashboard />} />
          <Route path="/backend/users" element={<Users />} />
          <Route path="/backend/users/add" element={<AddUser />} />
          <Route path="/backend/users/edit/:id" element={<EditUser />} />
          <Route path="/backend/barang/edit/:id" element={<EditBarang />} />
          <Route path="/backend/masyarakat" element={<Masyarakat />} />
          <Route path="/backend/barang" element={<Barang />} />
          <Route path="/backend/barang/:id" element={<Gambar />} />
          <Route path="/backend/barang/add" element={<AddBarang />} />
          <Route path="/backend/masyarakat/add" element={<AddMasyarakat />} />
          
          //Front-End Route
          <Route path="/login" element={<Loginfront/>} />
          <Route path="/edit/:id" element={<EditMas/>} />
          <Route path="/menang" element={<Menang/>} />
          <Route path="/penawaran" element={<RiwayatPenawaran/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<DashboardFront/>} />
          <Route path="/detail/:id" element={<Details/>} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
