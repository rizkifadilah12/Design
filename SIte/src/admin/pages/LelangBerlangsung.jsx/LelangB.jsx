import React, { useEffect } from "react";
import Layout from "../Layout";
import LelangBList from "../../components/lelangberlangsung/LelangBerlangsung";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const Lelangs = () => {
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
  }, [isError, navigate]);

  return (
    <Layout>
      <LelangBList />
    </Layout>
  );
};

export default Lelangs;
