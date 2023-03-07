import Layout from "../Layout";
import { useEffect } from "react";
import Riwayat from "../../components/Riwayat/RiwayatPenawaran";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/atuhSliceFront";


import React from 'react'
  
const RiwayatPenawaran = () => {
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
        <Riwayat/>
    </Layout>
  )
}

export default RiwayatPenawaran;