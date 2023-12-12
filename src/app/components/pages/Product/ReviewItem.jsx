// ReviewItem.js
import React from "react";
import axios from "axios";

const ReviewItem = ({ review, index, generateStars, currentReviews }) => {
//   const handleDelete = async () => {
//     try {
//       await axios.delete(
//         `https://localhost:8000/api/product/${review.productId}/reviews/${review.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${review.token}`,
//           },
//         }
//       );
//       onDeleteReview(); // Notify the parent component to refresh the reviews
//     } catch (error) {
//       console.error("Error deleting review:", error);
//     }
//   };

  return (
    <div>
      <li className="flex gap-5 md:gap-10">
        <div className="space-y-1 min-w-[120px]">
          <div className="text-customDarkGrey font-semibold">
            {review.firstname} {review.lastname}
          </div>
          <div className="text-customMediumGrey">{review.date}</div>
        </div>
        <div className="space-y-1 pt-1">
          <div className="flex">{generateStars(review.rating)}</div>
          <div>
            <b className="text-customDark">{review.title}</b>
          </div>
          <div>{review.comment}</div>
        </div>
      </li>
      {index !== currentReviews.length - 1 && <hr className="my-6" />}
    </div>
  );
};

export default ReviewItem;
