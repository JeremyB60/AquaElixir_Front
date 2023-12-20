// CheckoutForm.js
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { selectToken } from "../../../redux-store/authenticationSlice";
import { useSelector } from "react-redux";
import Logo from "../../../assets/images/icons/aquaelixir.ico";
import { useNavigate } from "react-router-dom";
import { URL_HOME } from "../../../constants/urls/urlFrontEnd";

const CheckoutForm = ({ stripePromise }) => {
  const [clientSecret, setClientSecret] = useState("");
  const token = useSelector(selectToken);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Tableau d'objets représentant les articles du panier
    const cartItemsData = cartItems.map((item) => ({
      price: item.productStripePriceId,
      quantity: item.quantity,
    }));
    console.log(cartItemsData);

    axios
      .post(
        "https://localhost:8000/api/create-checkout-session",
        {
          cartItems: cartItemsData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du clientSecret:", error);
        navigate(URL_HOME);
      });
  }, [token]);

  if (!clientSecret) {
    return (
      <div className="mx-auto p-5 max-w-screen-xl w-full min-h-[70vh] h-full bg-white flex justify-center items-center">
        <img src={Logo} alt="logo" className="loadingLogo" />
      </div>
    );
  }

  return (
    <div id="checkout" className="min-h-[70vh]">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};

export default CheckoutForm;
