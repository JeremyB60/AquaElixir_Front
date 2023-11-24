import React from "react";
import { useNavigate } from "react-router-dom";
import { URL_HOME } from "../constants/urls/urlFrontEnd";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../redux-store/authenticationSlice";
import UserList from "../components/account/UserList";

const AdminView = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-screen-xl w-full bg-white">
      <div className="hidden">
        <p className="font-extrabold text-secondary">ADMIN</p>
        <p>Username : {user.username}</p>
        <p>Rôle de l'utilisateur : {user.roles.join(", ")}</p>
        <p>Token d'authentification : {token}</p>{" "}
        <button
          className="btn btn-secondary"
          onClick={() => navigate(URL_HOME)}
        >
          Home User
        </button>
      </div>
      <UserList />
    </div>
  );
};

export default AdminView;
