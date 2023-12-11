import React, { useState } from "react";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import StarRating from "./StarRating";
import { useSelector } from "react-redux";

const ReviewForm = ({ productId, token, setReviews }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const validationSchema = Yup.object({
    rating: Yup.number()
      .min(1, "La note doit être au moins égale à 1")
      .max(5, "La note doit être au plus égale à 5"),
    // .required("La note est requise"),
    title: Yup.string().required("Le titre est requis"),
    comment: Yup.string().required("Le commentaire est requis"),
  });

  const [ratingFromStar, setRatingFromStar] = useState(0);

  const handleRatingChange = (newRating) => {
    // Faites quelque chose avec la nouvelle note remontée du composant StarRating
    setRatingFromStar(newRating);
    console.log("Nouvelle note sélectionnée dans ReviewForm :", newRating);
  };

  const onSubmit = async (values) => {
    values.rating = ratingFromStar;
    console.log(values);

    try {
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
      console.log("Requête POST réussie");

      // Actualisation de la liste des avis après l'ajout d'un nouvel avis
      const response = await axios.get(
        `https://localhost:8000/api/product/${productId}/reviews`
      );
      console.log("Réponse:", response);

      setReviews(response.data);
    } catch (error) {
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
      <div className="max-w-md mx-auto p-6 bg-white border rounded-md shadow-md">
        {userInfo?.firstName}{" "}
        {userInfo?.lastName ? userInfo.lastName.charAt(0) : ""}
        <h3 className="text-2xl font-semibold mb-4">Ajouter un avis</h3>
        <Form className="flex flex-col space-y-4">
          <StarRating onRatingChange={handleRatingChange} />
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Titre :</label>
            <Field
              type="text"
              name="title"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Commentaire :
            </label>
            <Field
              type="text"
              name="comment"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button type="submit" className="btn btn-black">
            Ajouter un avis
          </button>{" "}
        </Form>
      </div>
    </Formik>
  );
};

export default ReviewForm;
