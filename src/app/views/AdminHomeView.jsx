import React from "react";
import { useNavigate } from "react-router-dom";
import { URL_HOME } from "../constants/urls/urlFrontEnd";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../redux-store/authenticationSlice";

const AdminHomeView = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  return (
    <>
      <p className="font-extrabold text-secondary">ADMIN</p>
      <p>Username : {user.username}</p>
      <p>Rôle de l'utilisateur : {user.roles.join(", ")}</p>
      <p>Token d'authentification : {token}</p>{" "}
      <button className="btn btn-secondary" onClick={() => navigate(URL_HOME)}>
        Home User
      </button>
    </>
  );
};

export default AdminHomeView;
