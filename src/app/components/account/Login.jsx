import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import PasswordInput from "./PasswordInput";
import {
  URL_FORGOT_PASSWORD,
  URL_MY_ACCOUNT,
} from "../../constants/urls/urlFrontEnd";
import { signIn } from "../../redux-store/authenticationSlice";
import { authenticate } from "./../../api/backend/account";
import PropTypes from "prop-types";

/**
 * Component Login
 */

const Login = ({ toggle }) => {
  const [errorLog, setErrorLog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Le schéma de validation Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email("Adresse e-mail invalide")
      .required("L'adresse e-mail est requise"),
    password: Yup.string()
      .min(8, "Le mot de passe doit comporter au moins 8 caractères")
      .required("Le mot de passe est requis"),
  });

  const handleLogin = async (values) => {
    try {
      const res = await authenticate(values);
      if (res.status === 200 && res.data.token) {
        dispatch(signIn(res.data.token));
        navigate(URL_MY_ACCOUNT);
      } else {
        setErrorLog(true);
      }
    } catch (error) {
      setErrorLog(true);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl w-full bg-white md:px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:order-2 md:my-16 my-5 p-4 xl:pl-20 xl:pr-0 flex flex-col justify-center">
          <div>
            <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.5px] text-size32">
              S'identifier
            </h1>
          </div>

          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={handleLogin}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form className="relative mt-8 space-y-6 p-2 sm:p-0">
                <div className="flex flex-col gap-1.5">
                  <div className="relative mt-5">
                    <label htmlFor="username">Email</label>
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Adresse e-mail"
                      autoComplete="email"
                      className="input mt-2"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500">{errors.email}</div>
                    )}
                  </div>
                  <PasswordInput name="password" label="Mot de passe" />
                  {errors.password && touched.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm">
                    <Link to={URL_FORGOT_PASSWORD}>
                      <span className="cursor-pointer font-medium text-customBlue hover:text-customBlue hover:underline text-size16">
                        Mot de passe oublié ?
                      </span>
                    </Link>
                  </div>
                </div>
                <div>
                  <button type="submit" className="btn btn-black group mt-5">
                    Se connecter →
                  </button>
                </div>
                {errorLog && (
                  <div className="flex justify-center">
                    <small className="text-sm italic text-red-500">
                      Identifiant(s) incorrect(s)
                    </small>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
        <div className="sm:col-span-1 min-h-[385px] md:min-h-[685px] sm:my-16 mb-5 flex flex-col items-center justify-center gap-7 backgroundCreateAccount">
          <h2 className="text-3xl text-white font-bold tracking-[-0.5px] text-size32">
            Nouveau client ?
          </h2>
          <button onClick={toggle} className="btn btn-transparent">
            Créer un compte →
          </button>
        </div>
      </div>
    </div>
  );
};
Login.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Login;
