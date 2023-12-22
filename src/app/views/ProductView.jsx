import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { URL_HOME } from "../constants/urls/urlFrontEnd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart as addToCartAction } from "../redux-store/actions/cartActions";
import { selectToken } from "../redux-store/authenticationSlice";
import Logo from "../assets/images/icons/aquaelixir.ico";
import Reviews from "../components/pages/Product/Review";
import Description from "../components/pages/Product/Description";

const ProductView = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector(selectToken);
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const addToCart = (
    productId,
    productName,
    productType,
    productImage,
    productMesurement,
    productPrice,
    productStripePriceId,
    productTaxe,
    quantity,
    productSlug,
    productAverageReview
  ) => {
    dispatch(
      addToCartAction(
        productId,
        productName,
        productType,
        productImage,
        productMesurement,
        productPrice,
        productStripePriceId,
        productTaxe,
        quantity,
        productSlug,
        productAverageReview
      )
    );
    setLoading(true);
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
        setAddedToCart(true);

        setTimeout(() => {
          setLoading(false);
        }, 100);
        setTimeout(() => {
          setAddedToCart(false);
        }, 2000); // durée d'affichage de la quantité ajoutée
      })
      .catch((error) => {
        console.error("Error adding product to the cart", error);
        setLoading(false);
      });
  };

  const [reviewContent, setReviewContent] = useState(null);

  // Function to update content in the parent
  const updateReviewContent = (newContent) => {
    setReviewContent(newContent);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://localhost:8000/api/product/${slug}`
        );
        setProduct(response.data);
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
    return (
      <div className="mx-auto p-5 max-w-screen-xl w-full min-h-[70vh] h-full bg-white flex justify-center items-center">
        <img src={Logo} alt="logo" className="loadingLogo" />
      </div>
    );
  }

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
            <p className="font-semibold mb-2">{product.mesurement}</p>
            <div className="flex font-semibold items-center mb-2 md:mb-8">
              {reviewContent}
            </div>

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
                className={`btn2 mb-10 md:mb-0 mt-8 ${
                  loading || addedToCart
                    ? "loading bg-[#328634] border-2 border-solid border-[#328634]"
                    : "bg-customDark border-2 border-solid border-gray-800"
                }`}
                disabled={loading || addedToCart}
                onClick={() =>
                  addToCart(
                    product.id,
                    product.name,
                    product.type.name,
                    product.images[0].url,
                    product.mesurement,
                    product.price,
                    product.stripePriceId,
                    product.taxe,
                    quantity,
                    product.slug
                  )
                }
              >
                {loading ? (
                  <div className="loading-bar">
                    <div className="progress" />
                  </div>
                ) : addedToCart ? (
                  <div className="flex justify-center gap-2 items-center">
                    Ajouté
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                      fill="#fff"
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                  </div>
                ) : (
                  "Ajouter au panier"
                )}
              </button>
            )}
          </div>
        </div>
        <Description productName={product.name} />
        <Reviews
          productId={product.id}
          onUpdateReviewContent={updateReviewContent}
        />
      </div>
    </>
  );
};

export default ProductView;
