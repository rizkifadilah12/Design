import React, { useEffect } from "react";
import Layout from "../Layout";
import FormAddLelang from "../../components/lelang/FormAddLelang";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const AddLelang = () => {
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
      <FormAddLelang />
    </Layout>
  );
};

export default AddLelang;
