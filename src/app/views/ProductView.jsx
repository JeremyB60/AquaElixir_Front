import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { URL_HOME } from "../constants/urls/urlFrontEnd";
import Image from "../assets/images/productDescription.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart as addToCartAction } from "../actions/cartActions";
import { selectToken } from "../redux-store/authenticationSlice";

const ProductView = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector(selectToken);

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

  useEffect(() => {
    // Utilisez cartItems ici, l'effet sera déclenché chaque fois que cartItems change
    console.log("Cart items updated:", cartItems);
  }, [cartItems]);

  if (!product) {
    return <p>Chargement en cours...</p>;
  }

  const addToCart = (
    productId,
    productName,
    productType,
    productImage,
    productMesurement,
    productPrice,
    productTaxe,
    quantity
  ) => {
    dispatch(
      addToCartAction(
        productId,
        productName,
        productType,
        productImage,
        productMesurement,
        productPrice,
        productTaxe,
        quantity
      )
    );

    // Construction de l'objet à envoyer au backend
    const productData = {
      productId,
      quantity,
    };

    axios
      .post(
        "https://localhost:8000/api/update-cart",
        { products: [productData] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Product added to the cart successfully", response.data);
      })
      .catch((error) => {
        console.error("Error adding product to the cart", error);
      });
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto pl-4 py-5 text-sm font-medium">
        <Link to={URL_HOME}>Accueil</Link> |{" "}
        <Link to={`/categorie/${product.type.parent.slug}`}>
          {product.type.parent.name}
        </Link>{" "}
        |{" "}
        <Link to={`/sous-categorie/${product.type.slug}`}>
          {product.type.name}
        </Link>{" "}
        | <Link>{product.name}</Link>
      </div>
      <div className="mx-auto p-5 max-w-screen-xl w-full bg-white">
        <div className="md:flex mb-16">
          <div className="w-full md:w-1/2 max-w-[450px] mx-auto md:mx-0 mb-16 md:mb-0">
            <img
              src={`https://localhost:8000${product.images[0].url}`}
              alt={product.name}
              className="mb-3 mx-auto"
            />
          </div>
          <div className=" pl-0 md:pl-16">
            <h2 className="text-sm font-bold uppercase text-customMediumGrey">
              {product.type.parent.name}
            </h2>
            <h1 className="text-size24 font-bold my-1">{product.name}</h1>
            <p className="font-semibold mb-3 md:mb-8">{product.mesurement}</p>
            <p className="mb-3 md:mb-8 max-w-none md:max-w-[500px]">
              {product.description} {product.detailedDescription}{" "}
              {product.description} {product.detailedDescription}
            </p>
            <p className="text-size24 font-semibold mb-2 md:mb-8">
              {product.price} €
            </p>
            <div className="flex">
              {!token ? null : (
                <>
                  <p>Quantité</p>
                  <button
                    className="btn btn-transparent text-black border-customDark p-0 w-6 h-6 ml-3 rounded"
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity === 1}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2663_6125)">
                        <path
                          d="M3.3335 8H12.6668"
                          stroke="#1F1F1F"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2663_6125">
                          <rect width="16" height="16" rx="5" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  <span className="min-w-[40px] text-center">{quantity}</span>
                  <button
                    className="btn btn-transparent text-black border-customDark p-0 w-6 h-6 rounded"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2663_6131)">
                        <path
                          d="M8 3.33325V12.6666"
                          stroke="#1F1F1F"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3.3335 8H12.6668"
                          stroke="#1F1F1F"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2663_6131">
                          <rect width="16" height="16" rx="5" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>{" "}
                </>
              )}
            </div>
            {!token ? (
              <button
                className="btn-disabled mb-10 md:mb-0 mt-8"
                disabled
                title="Connectez-vous pour ajouter au panier"
              >
                Ajouter au panier
              </button>
            ) : (
              <button
                className="btn btn-black mb-10 md:mb-0 mt-8"
                onClick={() =>
                  addToCart(
                    product.id,
                    product.name,
                    product.type.name,
                    product.images[0].url,
                    product.mesurement,
                    product.price,
                    product.taxe,
                    quantity
                  )
                }
              >
                Ajouter au panier
              </button>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="w-full xl:max-w-[750px] space-y-3 mb-10 pr-0 xl:pr-16">
            <h3 className="text-size24 font-bold mb-10">
              En savoir plus sur le produit
            </h3>
            <h4 className="text-size16 uppercase font-semibold">Bénéfice</h4>
            <hr />
            <p className="pb-4">
              Hydratation en profondeur: Le concombre de mer pénètre
              profondément dans les cheveux, les hydratant de l'intérieur.
              Réparation et brillance: La kératine renforce la structure
              capillaire, minimise les pointes fourchues et la casse, et
              contribue à une chevelure plus lisse et plus brillante. Protection
              contre les agressions extérieures: En renforçant la barrière
              capillaire, ce masque protège vos cheveux des dommages causés par
              les éléments et les appareils chauffants.
            </p>
            <h4 className="text-size16 uppercase font-semibold">
              Mode Application
            </h4>
            <hr />
            <p className="pb-4">
              Après le shampooing, appliquez une quantité généreuse du masque
              capillaire sur vos cheveux mouillés, en évitant les racines.
              Laissez agir pendant 5 à 10 minutes pour permettre aux ingrédients
              de pénétrer. Rincez abondamment à l'eau tiède. Utilisez ce masque
              capillaire une à deux fois par semaine pour des résultats
              optimaux.
            </p>
            <h4 className="text-size16 uppercase font-semibold">Ingrédients</h4>
            <hr />
            <p className="pb-4">
              Eau (Aqua), Kératine hydrolysée (Hydrolyzed Keratin), Extrait de
              concombre de mer (Holothuria tubulosa Extract), Glycérine
              (Glycerin), Guar hydroxypropyltrimonium chloride, Caesalpinia
              spinosa gum, Alcool cétylique (Cetyl Alcohol), Parfum (Fragrance),
              Acide citrique.
            </p>
          </div>
          <div className="w-1/2 pt-[100px] hidden xl:block">
            <img src={Image} alt={product.images[0].alt} className="ml-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;
