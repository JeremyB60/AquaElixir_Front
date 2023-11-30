import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { URL_HOME } from "../constants/urls/urlFrontEnd";
import Image from "../assets/images/productDescription.jpg";

const ProductView = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://localhost:8000/api/product/${slug}`
        );
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit:", error);
      }
    };

    fetchProduct();
  }, [slug]);

  if (!product) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <>
      <div className="max-w-screen-xl mx-auto pl-4 py-5 text-sm font-medium">
        <Link to={URL_HOME}>Accueil</Link> |{" "}
        <Link className="capitalize">{product.type2.slug}</Link> |{" "}
        <Link>{product.name}</Link>
      </div>
      <div className="mx-auto p-5 max-w-screen-xl w-full bg-white">
        <div className="md:flex">
          <div className="max-w-[500px] scale-95 md:scale-100">
            <img
              src={`https://localhost:8000${product.images[0].url}`}
              alt={product.images[0].alt}
              className="mb-3 mx-auto"
            />
          </div>
          <div className="px-10">
            <h2 className="text-sm font-bold">{product.type.parent.name}</h2>
            <h1 className="text-size24 font-bold">{product.name}</h1>
            <p className="font-semibold mb-3 md:mb-10">{product.mesurement}</p>
            <p className="mb-3 md:mb-5">
              {product.description} {product.detailedDescription}
            </p>
            <p className="text-size24 font-semibold mb-2 md:mb-5">{product.price} €</p>
            <p>
              Quantité{" "}
              <button className="btn btn-transparent text-black border-customDark p-0 px-2 rounded-none mb-5">
                -
              </button>
              <span className="px-3">1</span>
              <button className="btn btn-transparent text-black border-customDark p-0 px-2 rounded-none">
                +
              </button>
              <br />
              <button className="btn btn-black mb-10 md:mb-0">Ajouter au panier</button>
            </p>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="p-4 w-full md:w-1/2 space-y-3">
            <h3 className="text-size24 font-bold">
              En savoir plus sur le produit
            </h3>
            <h4 className="text-size16 uppercase border-b font-semibold">
              Bénéfice
            </h4>
            <p>
              Hydratation en profondeur: Le concombre de mer pénètre
              profondément dans les cheveux, les hydratant de l'intérieur.
              Réparation et brillance: La kératine renforce la structure
              capillaire, minimise les pointes fourchues et la casse, et
              contribue à une chevelure plus lisse et plus brillante. Protection
              contre les agressions extérieures: En renforçant la barrière
              capillaire, ce masque protège vos cheveux des dommages causés par
              les éléments et les appareils chauffants.
            </p>
            <h4 className="text-size16 uppercase border-b font-semibold">
              Mode Application
            </h4>
            <p>
              Après le shampooing, appliquez une quantité généreuse du masque
              capillaire sur vos cheveux mouillés, en évitant les racines.
              Laissez agir pendant 5 à 10 minutes pour permettre aux ingrédients
              de pénétrer. Rincez abondamment à l'eau tiède. Utilisez ce masque
              capillaire une à deux fois par semaine pour des résultats
              optimaux.
            </p>
            <h4 className="text-size16 uppercase border-b font-semibold">
              Ingrédients
            </h4>
            <p>
              Eau (Aqua), Kératine hydrolysée (Hydrolyzed Keratin), Extrait de
              concombre de mer (Holothuria tubulosa Extract), Glycérine
              (Glycerin), Guar hydroxypropyltrimonium chloride, Caesalpinia
              spinosa gum, Alcool cétylique (Cetyl Alcohol), Parfum (Fragrance),
              Acide citrique.
            </p>
          </div>
          <div className="w-1/2 p-4 py-20 hidden md:block">
            <img
              src={Image}
              alt={product.images[0].alt}
              className="mb-3 mx-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;
