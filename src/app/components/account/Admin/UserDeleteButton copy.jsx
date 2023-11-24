import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const UserDeleteButton = ({ userId }) => {
  const [message, setMessage] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const [isDeleted, setIsDeleted] = useState(false); // Nouveau état pour indiquer si l'utilisateur a été supprimé

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `https://localhost:8000/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setIsDeleted(true); // Mettez à jour l'état après la suppression
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la suppression de l'utilisateur",
        error
      );
      setMessage(
        "Une erreur s'est produite lors de la suppression de l'utilisateur"
      );
    }
  };

  // Utilisez useEffect pour rafraîchir la page une fois que l'utilisateur a été supprimé
  useEffect(() => {
    if (isDeleted) {
      // Rafraîchir la page ici (ou mettez à jour dynamiquement l'état des utilisateurs dans votre composant parent)
      // Vous pouvez utiliser des bibliothèques de gestion d'état comme Redux pour une gestion plus avancée de l'état
      // window.location.reload();
      // ou
      // Autres logiques de mise à jour d'état / composant parent
    }
  }, [isDeleted]);

  return (
    <div>
      <button onClick={deleteUser}>Supprimer l'utilisateur</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserDeleteButton;
