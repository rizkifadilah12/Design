import React, { useEffect } from "react";
import Layout from "../Layout";
import BarangList from "../../components/Barang/BarangList";
import UniTest from "../../components/unitest";
import Welcome from "../../components/Welcome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const Barang = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <BarangList />
    </Layout>
  );
};

export default Barang;