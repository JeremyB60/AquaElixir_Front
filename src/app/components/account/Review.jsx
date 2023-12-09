import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux-store/authenticationSlice";

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });
  const token = useSelector(selectToken);

  // Chargement des avis lors du montage du composant
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://localhost:8000/api/product/${productId}/reviews`
        );
        setReviews(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleInputChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddReview = async () => {
    try {
      await axios.post(
        `https://localhost:8000/api/product/${productId}/reviews`,
        newReview,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("POST request successful");

      // Refreshing the list of reviews after adding a new review
      const response = await axios.get(
        `https://localhost:8000/api/product/${productId}/reviews`
      );
      console.log("Response:", response);

      setReviews(response.data);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  function generateStars(rating) {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      // Utilisez l'icône d'étoile de votre ensemble d'icônes
      stars.push(
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0L10.3511 4.76393L15.6085 5.52786L11.8042 9.23607L12.7023 14.4721L8 12L3.29772 14.4721L4.19577 9.23607L0.391548 5.52786L5.64886 4.76393L8 0Z"
            fill="#00819E"
          />
        </svg>
      );
    }
    return stars;
  }

  return (
    <div className="md:flex mt-20 gap-6">
      <div className="w-full md:w-1/2 max-w-[370px] mx-auto md:mx-0 mb-16 md:mb-0">
        <h3 className="text-size24 font-bold mb-10">Avis des clients</h3>
        <div className="flex items-center">
          {generateStars(5)}
          <span className="ml-4">Basé sur {reviews.length} avis</span>
        </div>
      </div>
      <div className="w-full">
        <ul className="">
          {reviews.map((review, index) => (
            <div key={review.id} className="">
              <li className="flex gap-10">
                <div className="space-y-1 pr-5">
                  <div>
                    {review.firstname} {review.lastname}
                  </div>
                  <div>{review.date}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex">{generateStars(review.rating)}</div>
                  <div>
                    <b>{review.title}</b>
                  </div>
                  <div>{review.comment}</div>
                </div>
              </li>
              {index !== reviews.length - 1 && <hr className="my-6" />}
            </div>
          ))}
        </ul>
      </div>

      {/* <div>
        <h3>Add a Review</h3>
        <label>
          Rating:
          <input
            type="number"
            min="1"
            max="5"
            name="rating"
            value={newReview.rating}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newReview.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Comment:
          <input
            type="text"
            name="comment"
            value={newReview.comment}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleAddReview}>Add Review</button>
      </div> */}
    </div>
  );
};

export default Reviews;
