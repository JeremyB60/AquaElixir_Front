import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ReportReviewButton = ({ reviewId }) => {
  const [isReported, setReported] = useState(false);

  const handleReport = async () => {
    try {
      await axios.post(`https://localhost:8000/report/${reviewId}`, null);
      console.log("Avis signalé");
      // Mettre à jour l'état pour indiquer que l'avis a été signalé avec succès
      setReported(true);
    } catch (error) {
      console.error("Error while reporting review", error);
    }
  };

  return (
    <>
      {!isReported && (
        <div className="flex items-end gap-1">
          <svg
            className="cursor-pointer -ml-1 arriveeSpectaculaire"
            onClick={handleReport}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="#4e4e4e"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z" />
            <path d="M5 21v-7" />
          </svg>{" "}
          Signaler l'avis
        </div>
      )}
      {isReported && <div className="text-red-500">Avis signalé</div>}
    </>
  );
};

export default ReportReviewButton;
