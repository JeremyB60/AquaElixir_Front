import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { selectToken } from "../../../redux-store/authenticationSlice";
import { useSelector } from "react-redux";
import { URL_HOME } from "../../../constants/urls/urlFrontEnd";
import Logo from "../../../assets/images/icons/aquaelixir.ico";
import { clearCart } from "../../../redux-store/actions/cartActions";
import { useDispatch } from "react-redux";

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        console.log(response.data);
        setStatus(data.status);
        setCustomerEmail(data.customer_email);

        // Request to clear the cart
        return axios.delete("https://localhost:8000/api/clear-cart", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
      })
      .then((clearCartResponse) => {
        // Handle the response from clearing the cart
        console.log(clearCartResponse.data);

        // Dispatch the clearCart action after clearing the cart
        dispatch(clearCart());
      })
      .catch((error) => {
        console.error("Error fetching status:", error);
        navigate(URL_HOME);
      });
  }, []);

  if (!status) {
    return (
      <div className="mx-auto p-5 max-w-screen-xl w-full min-h-[70vh] h-full bg-white flex justify-center items-center">
        <img src={Logo} alt="logo" className="loadingLogo" />
      </div>
    );
  }

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section
        id="success"
        className="min-h-[70vh] flex items-center justify-center bg-white"
      >
        <div className="max-w-2xl p-8 bg-customLightGrey rounded shadow-lg">
          <p className="mb-4">
            Nous vous remercions pour votre achat ! Un e-mail de confirmation
            sera envoyé à {customerEmail}. Si vous avez des questions, veuillez
            envoyer un e-mail à{" "}
            <a href="mailto:orders@example.com" className="text-blue-500">
              orders@aquaelixir.com
            </a>
            .
          </p>
          <div className="flex justify-center">
            <Link to={URL_HOME}>
              <button className="btn btn-black mt-10">
                Retourner sur l'Accueil →
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default Return;
