// CheckoutForm.js
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { selectToken } from "../../redux-store/authenticationSlice";
import { useSelector } from "react-redux";

const CheckoutForm = ({ stripePromise }) => {
  const [clientSecret, setClientSecret] = useState("");
  const token = useSelector(selectToken);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    // Construisez un tableau d'objets représentant les articles du panier
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
          // price: "price_1OO3ePBLaSzPsyD6ft8C7eGe",
          // quantity: 10,
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
      });
  }, [token]);

  return (
    <div id="checkout">
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
