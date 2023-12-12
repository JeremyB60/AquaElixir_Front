// DeleteReviewButton.js
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const DeleteReviewButton = ({ reviewId, onDeleteReview }) => {
  const token = useSelector((state) => state.auth.token);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:8000/api/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDeleteReview({ reviewId }); // Notify the parent component to refresh the reviews
      console.log("Suppression réussie");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 underline cursor-pointer"
    >
      Supprimer mon avis
    </button>
  );
};

export default DeleteReviewButton;
