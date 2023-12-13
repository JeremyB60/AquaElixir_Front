import React, { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import StarRating from "./StarRating";
import { useSelector } from "react-redux";

const ReviewForm = ({
  productId,
  token,
  setReviews,
  closeModal,
  handleModal,
}) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const validationSchema = Yup.object({
    rating: Yup.number().test(
      "non-zero",
      "La note ne peut pas être égale à 0",
      function (value) {
        const { isFormSubmitted } = this.options.context;
        return !isFormSubmitted || value !== 0;
      }
    ),
    title: Yup.string().required("Le titre est requis"),
    comment: Yup.string().required("Le commentaire est requis"),
  });

  const [ratingFromStar, setRatingFromStar] = useState(0);

  const handleRatingChange = (newRating) => {
    // Faites quelque chose avec la nouvelle note remontée du composant StarRating
    setRatingFromStar(newRating);
  };

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (values) => {
    values.rating = ratingFromStar;
    // Vérifier si la note est égale à 0 et afficher un message d'erreur
    if (values.rating === 0) {
      setErrorMessage("La note est requise.");
      return;
    }
    // Réinitialiser le message d'erreur en cas de soumission réussie
    setErrorMessage(null);

    console.log(values);

    try {
      setIsFormSubmitted(true);
      await axios.post(
        `https://localhost:8000/api/product/${productId}/reviews`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Avis transmis");

      // Actualisation de la liste des avis après l'ajout d'un nouvel avis
      const response = await axios.get(
        `https://localhost:8000/api/product/${productId}/reviews`
      );
      closeModal();

      console.log("Réponse:", response);
      setReviews(response.data);
    } catch (error) {
      setIsFormSubmitted(false);
      console.error("Erreur lors de l'ajout de l'avis:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        rating: "",
        title: "",
        comment: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="modal-overlay fixed inset-0 bg-black opacity-25"></div>
        <div className="modal-container bg-white w-11/12 mx-auto rounded-xl shadow-lg z-50 overflow-y-auto max-w-[680px]">
          <div className="modal-content p-10 text-left">
            <h4 className="text-2xl font-bold mb-8">Ajouter un avis</h4>
            <p className="font-semibold mb-2">
              {userInfo?.firstName} {userInfo?.lastName.charAt(0)}.
            </p>
            <Form className="flex flex-col">
              <div className="flex flex-col">
                <StarRating onRatingChange={handleRatingChange} />{" "}
                {errorMessage && <div className="my-2">{errorMessage}</div>}
              </div>
              <hr className="my-6 separateReview" />
              <div className="flex flex-col mb-5">
                <label htmlFor="title" className="mb-1 font-semibold">
                  Titre
                </label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  className="p-2 border rounded-md"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-black"
                />
              </div>
              <div className="flex flex-col mb-10">
                <label htmlFor="comment" className="mb-1 font-semibold">
                  Votre avis
                </label>
                <Field
                  as="textarea"
                  name="comment"
                  id="comment"
                  rows="5"
                  className="p-2 border rounded-md resize-none"
                />{" "}
                <ErrorMessage
                  name="comment"
                  component="div"
                  className="text-black"
                />
              </div>
              <div className="flex gap-6">
                <button
                  onClick={handleModal}
                  className="btn btn-transparentDark md:min-w-[130px]"
                  disabled={isFormSubmitted}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-black md:min-w-[215px]"
                  disabled={isFormSubmitted}
                >
                  Partager mon avis
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default ReviewForm;
