import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import PasswordInput from "./PasswordInput";
import { Link } from "react-router-dom";
import { URL_HOME, URL_MY_ACCOUNT } from "../../constants/urls/urlFrontEnd";
import { selectToken } from "../../redux-store/authenticationSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchUserInfo } from "../../redux-store/actions/userActions";
import { toast, Slide } from "react-toastify";

/**
 * Component MyAccount
 */

const MyAccount = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const token = useSelector(selectToken);
  const userInfo = useSelector((state) => state.user.userInfo); // Assurez-vous que 'user' correspond au nom de votre reducer
  const dispatch = useDispatch();

  // Le schéma de validation Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().matches(
      /^[a-zA-ZÀ-ÿ\s'-]+$/,
      "Le prénom doit contenir uniquement des lettres, des espaces, des tirets et des apostrophes"
    ),
    lastName: Yup.string().matches(
      /^[a-zA-ZÀ-ÿ\s'-]+$/,
      "Le nom doit contenir uniquement des lettres, des espaces, des tirets et des apostrophes"
    ),
  });

  const handleUpdate = async (values) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.put(
        "https://localhost:8000/api/modify-user",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Utiliser les données maintenant sous forme d'objet JavaScript
      const responseData = response.data;
      console.log(responseData);

      // Mise à jour de l'état ou autre traitement si nécessaire
      // setSuccessMessage("Mise à jour réussie !");
      // Mettre à jour le Redux store avec les nouveaux prénom et nom
      dispatch(fetchUserInfo(token));

      // Afficher le toast de succès avec les options
      toast.info(
        <div>
          <p style={{ margin: "5px" }}>Mise à jour réussie !</p>
        </div>,
        {
          position: toast.POSITION.TOP_CENTER, // Position au centre en haut
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          transition: Slide,
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path
                d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                fill="#00819E"
              />
            </svg>
          ),
          style: {
            background: "#FFF",
            color: "#2E2E2E",
            borderRadius: "5px", // Coins arrondis
            border: "none", // Bordure
            boxShadow: "0px 1px 4px 0px #00000040",
          },
          progressStyle: {
            background: "#00819E", // Couleur de la barre de progression
            height: "3px", // Hauteur de la barre de progression
          },
        }
      );
    } catch (error) {
      console.error("Erreur de requête:", error.message);
      console.log(
        "Contenu de la réponse:",
        error.response ? error.response.data : "Aucune réponse"
      );
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center relative py-20">
      <div className="absolute top-5 left-0 pl-4 text-sm font-medium">
        <Link to={URL_HOME}>Accueil</Link> |{" "}
        <Link to={URL_MY_ACCOUNT}>Mon compte</Link>
      </div>
      <div className="w-full max-w-[650px] bg-white px-4">
        <div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.5px] text-size32">
            Mon compte
          </h1>
        </div>

        <Formik
          initialValues={{
            firstName: userInfo?.firstName || "",
            lastName: userInfo?.lastName || "",
            // password: "",
            // confirmPassword: "",
          }}
          onSubmit={handleUpdate}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form className="relative mt-8 space-y-6 p-2 sm:p-0">
              <div className="flex flex-col gap-1.5">
                <div className="relative mt-5">
                  <label htmlFor="lastName">Nom</label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="input mt-2"
                  />
                  {errors.lastName && touched.lastName && (
                    <div className="text-red-500">{errors.lastName}</div>
                  )}
                </div>
                <div className="relative mt-5">
                  <label htmlFor="firstName">Prénom</label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="input mt-2"
                  />
                  {errors.firstName && touched.firstName && (
                    <div className="text-red-500">{errors.firstName}</div>
                  )}
                </div>
                {/* <PasswordInput
                  name="confirmPassword"
                  label="Mot de passe actuel"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500">{errors.confirmPassword}</div>
                )}
                <PasswordInput name="password" label="Nouveau mot de passe" />
                {errors.password && touched.password && (
                  <div className="text-red-500">{errors.password}</div>
                )} */}
              </div>
              <div>
                <button type="submit" className="btn btn-black mt-5">
                  Enregistrer mes modifications →
                </button>
              </div>
              {/* Afficher le message de succès si présent */}
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
              {/* Afficher le message d'erreur si présent */}
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MyAccount;
