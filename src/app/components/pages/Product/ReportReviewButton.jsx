import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ReportReviewButton = ({ reviewId }) => {
  const token = useSelector((state) => state.auth.token);
  const [isReported, setReported] = useState(false);

  const handleReport = async () => {
    try {
      // Effectuer la requête API pour signaler l'avis avec Axios
      const response = await axios.post(
        `https://localhost:8000/api/report/${reviewId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Assurez-vous de définir votre token ici
          },
        }
      );
    console.log('Avis signalé')
      // Mettre à jour l'état pour indiquer que l'avis a été signalé avec succès
      setReported(true);
    } catch (error) {
      console.error("Error while reporting review", error);
    }
  };

  return (
    <>
      {!isReported && <button onClick={handleReport}>Signaler</button>}
      {isReported && <span>Signalé</span>}
    </>
  );
};

export default ReportReviewButton;
