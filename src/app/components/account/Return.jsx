// Return.js
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { selectToken } from "../../redux-store/authenticationSlice";
import { useSelector } from "react-redux";

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const token = useSelector(selectToken);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    axios
      .post(
        "https://localhost:8000/api/status",
        { session_id: sessionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const data = response.data;
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      })
      .catch((error) => {
        console.error("Error fetching status:", error);
      });
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          Nous vous remercions de votre activité ! Un e-mail de confirmation
          sera envoyé à {customerEmail}. Si vous avez des questions, veuillez
          envoyer un e-mail à{" "}
          <a href="mailto:orders@example.com">orders@aquaelixir.com</a>.
        </p>
      </section>
    );
  }

  return null;
};

export default Return;
