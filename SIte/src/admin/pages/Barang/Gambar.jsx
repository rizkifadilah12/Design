
import React, { useEffect } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddGambar from "../../components/Gambar/FromAddGambar";
import { getMe } from "../../../features/authSlice";
import FormAddBarang from "../../components/Barang/FormAddBarang"
import GambarList from "../../components/Gambar/Gambar";

const Gambar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "petugas") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <AddGambar />
    </Layout>
  );
};

export default Gambar;
