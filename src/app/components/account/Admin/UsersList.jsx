import React, { useEffect, useState } from "react";
import axios from "axios";
import UserBanButton from "./UserBanButton";
import UserDeleteButton from "./UserDeleteButton";
import { selectToken } from "../../../redux-store/authenticationSlice";
import { useSelector } from "react-redux";

const UsersList = () => {
  const handleUserDeleted = ({ userId }) => {
    // Mettez à jour l'état des utilisateurs en excluant l'utilisateur supprimé
    setUsers((users) => users.filter((user) => user.id !== userId));
  };
  const handleUserBanned = ({ userId }) => {
    // Mettez à jour l'état des utilisateurs en modifiant le statut de l'utilisateur
    setUsers((users) =>
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              accountStatus:
                user.accountStatus === "active" ? "suspend" : "active",
            }
          : user
      )
    );
  };

  const token = useSelector(selectToken);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://localhost:8000/api/users",
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="md:col-span-3 p-4">
      <h1 className="text-2xl mb-10 font-bold">
        Administration - Liste des comptes utilisateurs
      </h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-t-2 border-customDark">
            <th className="min-w-1/12 p-2 text-left">ID</th>
            <th className="min-w-1/3 p-2 text-left">Nom</th>
            <th className="min-w-1/3 p-2 text-left">Prénom</th>
            <th className="min-w-1/2 p-2 text-left">Email</th>
            <th className="min-w-1/2 p-2 text-left">Créé le</th>
            <th className="min-w-1/2 p-2 text-left">Statut</th>
            <th className="min-w-1/2 p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.lastName}</td>
              <td className="p-2">{user.firstName}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.createdAt}</td>
              <td className="p-2">{user.accountStatus}</td>
              <td className="p-2 md:flex gap-1">
                <UserBanButton
                  userId={user.id}
                  onUserBanned={handleUserBanned}
                  accountStatus={user.accountStatus}
                />
                <UserDeleteButton
                  key={user.id}
                  userId={user.id}
                  onUserDeleted={handleUserDeleted}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
