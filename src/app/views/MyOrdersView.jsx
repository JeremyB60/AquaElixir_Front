import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { URL_AUTHFORM } from "../constants/urls/urlFrontEnd";
import { selectIsLogged } from "../redux-store/authenticationSlice";
import MyOrders from "../components/account/CheckoutForm";

const MyOrdersView = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsLogged);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) navigate(URL_AUTHFORM);
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl p-5 w-full bg-white">
      <MyOrders />
    </div>
  );
};

export default MyOrdersView;
