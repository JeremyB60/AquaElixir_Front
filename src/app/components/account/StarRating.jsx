import React, { useState } from "react";

const StarRating = ({ onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleStarHover = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  const handleStarClick = (clickedRating) => {
    setSelectedRating(clickedRating);
    // Appeler la fonction de rappel avec la nouvelle note
    onRatingChange(clickedRating);
  };

  return (
    <div className="star-rating flex gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <svg
          key={value}
          className="star"
          width="32"
          height="32"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseEnter={() => handleStarHover(value)}
          onMouseLeave={() => handleStarHover(0)}
          onClick={() => handleStarClick(value)}
        >
          <path
            d="M8 0L10.3511 4.76393L15.6085 5.52786L11.8042 9.23607L12.7023 14.4721L8 12L3.29772 14.4721L4.19577 9.23607L0.391548 5.52786L5.64886 4.76393L8 0Z"
            fill={value <= (hoverRating || selectedRating) ? "#00819E" : "none"}
            stroke="#00819E"
            strokeWidth="0.5"
          />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
