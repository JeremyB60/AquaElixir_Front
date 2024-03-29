import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "../../../redux-store/authenticationSlice";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";

const Reviews = ({ productId, onUpdateReviewContent }) => {
  const [reviews, setReviews] = useState([]);
  const token = useSelector(selectToken);
  const [itemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (event) => {
    setIsModalOpen(false);
  };

  const handleModal = (event) => {
    event.preventDefault();
    setIsModalOpen(false);
  };

  const handleReviewDeleted = ({ reviewId }) => {
    setReviews((currentReviews) =>
      currentReviews.filter((review) => review.id !== reviewId)
    );
  };

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function generateStars(rating) {
    if (rating === null || rating === 0) {
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
            fill="#d9d9d9"
            stroke="#d9d9d9"
            strokeWidth="1"
          />
        </svg>
      ));

      return emptyStars;
    }

    const filledStars = Math.round(rating);

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
    totalAvis > 0
      ? (reviews.filter((review) => review.rating === 1).length / totalAvis) *
        100
      : 0;

  const pourcentageNote2 =
    totalAvis > 0
      ? (reviews.filter((review) => review.rating === 2).length / totalAvis) *
        100
      : 0;

  const pourcentageNote3 =
    totalAvis > 0
      ? (reviews.filter((review) => review.rating === 3).length / totalAvis) *
        100
      : 0;

  const pourcentageNote4 =
    totalAvis > 0
      ? (reviews.filter((review) => review.rating === 4).length / totalAvis) *
        100
      : 0;

  const pourcentageNote5 =
    totalAvis > 0
      ? (reviews.filter((review) => review.rating === 5).length / totalAvis) *
        100
      : 0;

  const avisParNote = [
    { pourcentage: pourcentageNote1, nombreAvis: nombreAvisNote1 },
    { pourcentage: pourcentageNote2, nombreAvis: nombreAvisNote2 },
    { pourcentage: pourcentageNote3, nombreAvis: nombreAvisNote3 },
    { pourcentage: pourcentageNote4, nombreAvis: nombreAvisNote4 },
    { pourcentage: pourcentageNote5, nombreAvis: nombreAvisNote5 },
  ];

  // Calcul de la moyenne des avis totaux
  const moyenneAvisTotaux =
    totalAvis > 0
      ? Math.round(
          (1 * nombreAvisNote1 +
            2 * nombreAvisNote2 +
            3 * nombreAvisNote3 +
            4 * nombreAvisNote4 +
            5 * nombreAvisNote5) /
            totalAvis
        )
      : 0;

  // Utilisez useMemo pour mémoriser le contenu JSX
  const reviewContent = useMemo(
    () => (
      <>
        {generateStars(moyenneAvisTotaux)}
        <span className="ml-4">
          {moyenneAvisTotaux === null || moyenneAvisTotaux === 0
            ? '-'
            : moyenneAvisTotaux % 1 === 0
            ? moyenneAvisTotaux.toFixed(0)
            : moyenneAvisTotaux.toFixed(1)}
        </span>
        <span className="mx-2">|</span>
        <span>{reviews.length} avis</span>
      </>
    ),
    [moyenneAvisTotaux, reviews.length]
  );

  useEffect(() => {
    // Appelez la fonction de mise à jour du parent avec le contenu mémorisé
    onUpdateReviewContent(reviewContent);
  }, [reviewContent, onUpdateReviewContent]);

  return (
    <>
      <div className="md:flex mt-20 gap-20 mb-16">
        <div className="w-full md:w-1/2 max-w-[370px] mx-auto md:mx-0 mb-16 md:mb-0">
          <h3 className="text-size24 font-bold mb-4">Avis des clients</h3>
          <div className="flex items-center">
            {generateStars(moyenneAvisTotaux)}
            <span className="ml-4 font-semibold text-customDarkGrey">
              Basé sur {reviews.length} avis
            </span>
          </div>
          <div className="py-7">
            {avisParNote.reverse().map((avis, index) => (
              <div key={index} className="flex items-center">
                <div className="pourcentage-label w-3">
                  {avisParNote.length - index}
                </div>
                <svg
                  className="w-12"
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
                <div className="barre-container my-3">
                  <div
                    className="barre"
                    style={{ width: `${avis.pourcentage}%` }}
                  ></div>
                </div>
                {reviews.length > 0 && (
                  <div className="w-0 mx-2">{avis.nombreAvis}</div>
                )}
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-size24 font-semibold mb-1">
              Partagez votre avis
            </h4>
            <p className="mb-7">
              Si vous avez utilisé ce produit, partagez vos impressions avec
              d'autres clients.
            </p>
            {!token ? (
              <button
                className="btn-disabled mb-10 md:mb-0 mt-8"
                disabled
                title="Connectez-vous pour donner votre avis"
              >
                Donner un avis
              </button>
            ) : (
              <button className="btn btn-black" onClick={openModal}>
                Donner un avis
              </button>
            )}
          </div>
        </div>
        <div className="w-full pt-2">
          {reviews.length === 0 ? (
            <p className="text-customMediumGrey">
              Soyez le premier à donner votre avis.
            </p>
          ) : (
            <div>
              <ul>
                {currentReviews.map((review, index) => (
                  <ReviewItem
                    key={review.id}
                    review={review}
                    index={index}
                    generateStars={generateStars}
                    currentReviews={currentReviews}
                    onDeleteReview={handleReviewDeleted}
                    email={review.email}
                  />
                ))}
              </ul>
              {reviews.length > itemsPerPage && (
                <div className="pagination mt-10">
                  <ul className="flex justify-center md:justify-end gap-3">
                    {Array.from(
                      { length: Math.ceil(reviews.length / itemsPerPage) },
                      (_, index) => (
                        <li
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                          className={
                            index + 1 === currentPage
                              ? "font-bold text-customBlue underline underline-offset-4 cursor-pointer"
                              : "cursor-pointer"
                          }
                        >
                          {index + 1}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <ReviewForm
          productId={productId}
          token={token}
          setReviews={setReviews}
          closeModal={closeModal}
          handleModal={handleModal}
        />
      )}
    </>
  );
};

export default Reviews;
