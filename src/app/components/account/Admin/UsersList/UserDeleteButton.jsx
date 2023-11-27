import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UserDeleteButton = ({ userId, onUserDeleted }) => {
  const [message, setMessage] = useState(null);
  const token = useSelector((state) => state.auth.token);

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

      // Si la suppression est réussie, appelez la fonction de rappel pour mettre à jour l'interface utilisateur
      if (onUserDeleted) {
        onUserDeleted({ userId });
      }
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

  return (
    <div>
      <svg
        style={{ cursor: "pointer" }}
        onClick={deleteUser}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1876_3001)">
          <path
            d="M4 7H20"
            stroke="#00819E"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7"
            stroke="#00819E"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7"
            stroke="#00819E"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1876_3001">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default UserDeleteButton;
