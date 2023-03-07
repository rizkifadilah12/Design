import Layout from "../Layout";
import { useEffect } from "react";
import RiwayatMenang from "../../components/Riwayat/RiwayatMenang";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/atuhSliceFront";


import React from 'react'
  
const Menang = () => {
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
        <RiwayatMenang/>
    </Layout>
  )
}

export default Menang;