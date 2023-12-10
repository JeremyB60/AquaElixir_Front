import React from "react";
import { useFormik, Field, Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ReviewForm = ({ productId, token, setReviews }) => {
  const validationSchema = Yup.object({
    rating: Yup.number()
      .min(1, "La note doit être au moins égale à 1")
      .max(5, "La note doit être au plus égale à 5")
      .required("La note est requise"),
    title: Yup.string().required("Le titre est requis"),
    comment: Yup.string().required("Le commentaire est requis"),
  });

  const onSubmit = async (values) => {
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
        rating: 5,
        title: "",
        comment: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <div>
        <h3>Ajouter un avis</h3>
        <Form>
          <label>
            Note :
            <Field
              type="number"
              min="1"
              max="5"
              name="rating"
            />
          </label>
          <br />
          <label>
            Titre :
            <Field
              type="text"
              name="title"
            />
          </label>
          <br />
          <label>
            Commentaire :
            <Field
              type="text"
              name="comment"
            />
          </label>
          <br />
          <button type="submit">Ajouter un avis</button>
        </Form>
      </div>
    </Formik>
  );
};

export default ReviewForm;
