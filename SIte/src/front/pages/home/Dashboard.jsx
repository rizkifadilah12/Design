import Layout from "../Layout";
import { useEffect } from "react";
import Product from "../../components/home/Product";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/atuhSliceFront";


import React from 'react'
  
const DashboardFront = () => {
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
        <Product/>
    </Layout>
  )
}

export default DashboardFront;