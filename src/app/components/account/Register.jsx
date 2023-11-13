import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import PasswordInput from "./PasswordInput";

/**
 * Component Register
 */

const Register = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Le schéma de validation Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Le prénom est requis"),
    lastName: Yup.string().required("Le nom est requis"),
    email: Yup.string()
      .email("Adresse e-mail invalide")
      .required("L'adresse e-mail est requise"),
    password: Yup.string()
      .min(8, "Le mot de passe doit comporter au moins 8 caractères")
      .required("Le mot de passe est requis"),
  });

  // Fonction pour envoyer l'inscription au serveur
  const handleRegister = async (values) => {
    // Efface le message s'il y a
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      // Récupère la réponse du serveur
      const result = await response.json();
      console.log(result);

      // Vérifie la réponse du serveur
      if (response.ok) {
        // Définissez le message de succès dans l'état local
        setSuccessMessage(
          "Inscription réussie ! Vous pouvez maintenant vous connecter."
        );
      } else {
        // Afficher un message d'erreur à l'utilisateur
        console.error(result.error || result.errors);
        // Définissez le message d'erreur dans l'état local
        setErrorMessage(result.error || result.errors);
      }
    } catch (error) {
      // Gère les erreurs liées à la requête
      console.error("Erreur de requête:", error.message);
      // Définissez le message d'erreur dans l'état local
      setErrorMessage("Erreur de requête: " + error.message);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-[546px] md:my-16 my-5 md:h-[646px] p-4 xl:pl-0 xl:pr-20 flex flex-col justify-center">
          <div>
            <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.5px] text-size32">
              S'inscrire
            </h1>
          </div>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            onSubmit={handleRegister}
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
                      placeholder="Nom"
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
                      placeholder="Prénom"
                      className="input mt-2"
                    />
                    {errors.firstName && touched.firstName && (
                      <div className="text-red-500">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="relative mt-5">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email"
                      autoComplete="email"
                      className="input mt-2"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500">{errors.email}</div>
                    )}
                  </div>
                  <PasswordInput />
                  {errors.password && touched.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-black mt-5"
                  >
                    S'inscrire →
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
        <div className="sm:col-span-1 h-[425px] sm:h-[646px] sm:my-16 mb-5 flex flex-col items-center justify-center gap-7 backgroundAlreadyRegistred">
          <h2 className="text-3xl text-black font-bold tracking-[-0.5px] text-size32">
            Déjà inscrit ?
          </h2>
          <Link to="/login">
            <button className="btn btn-transparentDark">
              Se connecter →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
