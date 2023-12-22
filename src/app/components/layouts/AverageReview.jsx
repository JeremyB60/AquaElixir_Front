import React from "react";

function RatingStars({ averageReview }) {
  if (averageReview === null || averageReview === 0) {
    // Si la moyenne des avis est 0, afficher des étoiles vides avec un contour gris
    const emptyStars = Array.from({ length: 5 }, (_, index) => (
      <svg
        className="mr-1"
        key={`empty-${index}`}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* SVG path for the empty star with gray border and white fill */}
        <path
          d="M8 0L10.3511 4.76393L15.6085 5.52786L11.8042 9.23607L12.7023 14.4721L8 12L3.29772 14.4721L4.19577 9.23607L0.391548 5.52786L5.64886 4.76393L8 0Z"
          fill="#d9d9d9" // White fill for the empty star
          stroke="#d9d9d9" // Gray border color for the empty star
          strokeWidth="1" // Adjust the border width as needed
        />
      </svg>
    ));

    return <>{emptyStars}</>;
  }

  const filledStars = Math.round(averageReview);

  const stars = [];

  // Add filled stars
  for (let i = 0; i < filledStars; i++) {
    stars.push(
      <svg
        className="mr-1"
        key={i}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="#00819E"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 0L10.3511 4.76393L15.6085 5.52786L11.8042 9.23607L12.7023 14.4721L8 12L3.29772 14.4721L4.19577 9.23607L0.391548 5.52786L5.64886 4.76393L8 0Z"
          stroke="#00819E"
          strokeWidth="1"
        />
      </svg>
    );
  }

  // Add empty stars to reach a total of 5 stars
  const emptyStars = 5 - filledStars;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <svg
        className="mr-1"
        key={`empty-${i}`}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* SVG path for the empty star with blue border and white fill */}
        <path
          d="M8 0L10.3511 4.76393L15.6085 5.52786L11.8042 9.23607L12.7023 14.4721L8 12L3.29772 14.4721L4.19577 9.23607L0.391548 5.52786L5.64886 4.76393L8 0Z"
          fill="#FFFFFF" // White fill for the empty star
          stroke="#00819E" // Blue border color for the empty star
          strokeWidth="1" // Adjust the border width as needed
        />
      </svg>
    );
  }

  return <>{stars}</>;
}

export default RatingStars;
