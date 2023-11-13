import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ROLE_ADMIN } from "../constants/rolesConstant";
import { URL_ADMIN_HOME } from "../constants/urls/urlFrontEnd";
import {
  selectHasRole,
  selectToken,
  selectUser,
} from "../redux-store/authenticationSlice";

const HomeView = () => {
  const isAdmin = useSelector((state) => selectHasRole(state, ROLE_ADMIN));
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  console.log(token); // Affiche le token dans la console
  console.log(user); // Affiche les informations de l'utilisateur dans la console

  return (
    <div>
      <p className="font-extrabold text-primary">HOME</p>
      <p>Username : {user.username}</p>
      <p>Rôle de l'utilisateur : {user.roles.join(", ")}</p>
      <p>Token d'authentification : {token}</p>{" "}
      {isAdmin && (
        <button
          className="btn btn-primary"
          onClick={() => navigate(URL_ADMIN_HOME)}
        >
          Admin
        </button>
      )}
    </div>
  );
};

export default HomeView;
