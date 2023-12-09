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
          key={i}
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

  /*GRAPHIQUE */
  const totalAvis = reviews.length;
  const nombreAvisNote1 = reviews.filter(
    (review) => review.rating === 1
  ).length;
  const nombreAvisNote2 = reviews.filter(
    (review) => review.rating === 2
  ).length;
  const nombreAvisNote3 = reviews.filter(
    (review) => review.rating === 3
  ).length;
  const nombreAvisNote4 = reviews.filter(
    (review) => review.rating === 4
  ).length;
  const nombreAvisNote5 = reviews.filter(
    (review) => review.rating === 5
  ).length;

  const pourcentageNote1 =
    (reviews.filter((review) => review.rating === 1).length / totalAvis) * 100;
  const pourcentageNote2 =
    (reviews.filter((review) => review.rating === 2).length / totalAvis) * 100;
  const pourcentageNote3 =
    (reviews.filter((review) => review.rating === 3).length / totalAvis) * 100;
  const pourcentageNote4 =
    (reviews.filter((review) => review.rating === 4).length / totalAvis) * 100;
  const pourcentageNote5 =
    (reviews.filter((review) => review.rating === 5).length / totalAvis) * 100;

  const avisParNote = [
    { pourcentage: pourcentageNote1, nombreAvis: nombreAvisNote1 },
    { pourcentage: pourcentageNote2, nombreAvis: nombreAvisNote2 },
    { pourcentage: pourcentageNote3, nombreAvis: nombreAvisNote3 },
    { pourcentage: pourcentageNote4, nombreAvis: nombreAvisNote4 },
    { pourcentage: pourcentageNote5, nombreAvis: nombreAvisNote5 },
  ];

  return (
    <div className="md:flex mt-20 gap-20 mb-16">
      <div className="w-full md:w-1/2 max-w-[370px] mx-auto md:mx-0 mb-16 md:mb-0">
        <h3 className="text-size24 font-bold mb-10">Avis des clients</h3>
        <div className="flex items-center">
          {generateStars(5)}
          <span className="ml-4 text-customDarkGrey">
            Basé sur {reviews.length} avis
          </span>
        </div>
        <div className="py-8">
          {avisParNote.reverse().map((avis, index) => (
            <div key={index} className="flex items-center">
              <div className="pourcentage-label w-3">{index + 1}</div>
              <svg
                className="mx-3 w-5"
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
              <div className="barre-container my-2">
                <div
                  className="barre"
                  style={{ width: `${avis.pourcentage}%` }}
                ></div>
              </div>
              <div className="w-0 mx-2">{avis.nombreAvis}</div>
            </div>
          ))}
        </div>
        <div>
          <h4 className="text-size24 font-semibold mb-2">
            Partagez votre avis
          </h4>
          <p className="mb-8">
            Si vous avez utilisé ce produit, partagez vos impressions avec
            d'autres clients.
          </p>
          <div className="btn btn-black">Donner un avis</div>
        </div>
      </div>
      <div className="w-full pt-2">
        <ul>
          {reviews.map((review, index) => (
            <div key={review.id}>
              <li className="flex gap-10">
                <div className="space-y-1 pr-5">
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
