import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../redux-store/actions/cartActions";
import { Link } from "react-router-dom";
import { URL_HOME } from "../constants/urls/urlFrontEnd";
import axios from "axios";
import { selectToken } from "../redux-store/authenticationSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector(selectToken);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    axios
      .delete("https://localhost:8000/api/delete-product-cart", {
        data: { productId: productId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Product deleted successfully", response.data);
      })
      .catch((error) => {
        console.error("Error deleting product", error);
      });
  };

  const handleUpdateCartItem = (productId, newQuantity) => {
    dispatch(updateCartItem(productId, newQuantity));
    // Construction de l'objet à envoyer au backend
    const productData = {
      productId,
      newQuantity,
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
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error adding product to the cart", error);
      });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!cartItems) {
    return <p>Chargement du panier...</p>;
  }

  // Fonction pour calculer le total avec deux décimales ou zéro
  const calculateTotal = () => {
    const total = cartItems.reduce(
      (accumulator, item) => accumulator + item.productPrice * item.quantity,
      0
    );

    return total % 1 !== 0 ? total.toFixed(2) : total.toFixed(0);
  };

  // Fonction pour calculer la TVA avec deux décimales ou zéro
  const calculateTaxe = () => {
    const totalTTC = calculateTotal();
    const totalHT = calculateTotalHT();
    const tva = totalTTC - totalHT;

    return tva % 1 !== 0 ? tva.toFixed(2) : tva.toFixed(0);
  };

  // Fonction pour calculer le total HT avec deux décimales ou zéro
  const calculateTotalHT = () => {
    const totalTTC = calculateTotal();
    const tauxTVA = 0.2; // Remplacez par le taux de TVA applicable
    const totalHT = totalTTC / (1 + tauxTVA);
    return totalHT % 1 !== 0 ? totalHT.toFixed(2) : totalHT.toFixed(0);
  };

  // Appel à l'API Symfony depuis React

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "http://votre-api.com/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Ajoutez les données du panier ici
          body: JSON.stringify({
            items: [
              {
                id: 1,
                name: "Produit 1",
                price: 19.99,
                quantity: 2,
              },
              // ... autres articles du panier ...
            ],
            total: 69.97,
          }),
        }
      );

      const session = await response.json();

      // Redirigez l'utilisateur vers la page de paiement Stripe
      window.location.href = `https://checkout.stripe.com/pay/${session.id}`;
    } catch (error) {
      console.error(
        "Erreur lors de la création de la session de paiement",
        error
      );
    }
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto pl-4 pt-5 text-sm font-medium">
        <Link to={URL_HOME}>Accueil</Link> | <Link>Mon panier</Link>
      </div>
      <div className="flex-col mx-auto max-w-screen-xl pl-4 w-full bg-white">
        <h1 className="text-size32 font-bold my-10">Panier</h1>
        <div className="flex flex-wrap mb-20">
          <div className="w-full lg:w-1/2 mb-10 pr-4 lg:pr-8">
            <ul>
              {cartItems.length === 0 ? (
                <p>Votre panier est vide</p>
              ) : (
                cartItems.map((item, index) => (
                  <div key={item.productId}>
                    <li>
                      <div className="flex h-[auto]">
                        <div className="min-w-[150px] w-[150px] flex items-center">
                          <Link to={`/produit/${item.productSlug}`}>
                            <img
                              src={`https://localhost:8000${item.productImage}`}
                              alt={item.productName}
                              className="mx-auto"
                            />
                          </Link>
                        </div>
                        <div className="flex-col pl-6 flex-1">
                          <div className="flex justify-between">
                            <p className="font-bold">{item.productName}</p>
                            <button
                              onClick={() =>
                                handleRemoveFromCart(item.productId)
                              }
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_2618_6118)">
                                  <path
                                    d="M18 6L6 18"
                                    stroke="#4E4E4E"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M6 6L18 18"
                                    stroke="#4E4E4E"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_2618_6118">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </div>
                          <p className="text-customDarkGrey mb-2">
                            {item.productType}
                          </p>
                          <p className="text-customDarkGrey">
                            {item.productMesurement}
                          </p>
                          <div className="flex justify-between mt-[65px]">
                            <p className="font-semibold">
                              {parseFloat(
                                (item.productPrice * item.quantity).toFixed(2)
                              ).toFixed(2)}
                              €
                            </p>
                            <div className="flex mr-1">
                              <button
                                className="btn btn-transparent text-black border-customDark p-0 w-6 h-6 rounded"
                                onClick={() =>
                                  handleUpdateCartItem(
                                    item.productId,
                                    item.quantity - 1
                                  )
                                }
                                disabled={item.quantity === 1}
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
                                      <rect
                                        width="16"
                                        height="16"
                                        rx="5"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                              <span className="min-w-[40px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                className="btn btn-transparent text-black border-customDark p-0 w-6 h-6 rounded"
                                onClick={() =>
                                  handleUpdateCartItem(
                                    item.productId,
                                    item.quantity + 1
                                  )
                                }
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
                                      <rect
                                        width="16"
                                        height="16"
                                        rx="5"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    {index !== cartItems.length - 1 && <hr className="my-5" />}
                  </div>
                ))
              )}
            </ul>
          </div>
          <div className="w-full lg:w-1/2 mb-10 pr-4 pl-0 lg:pl-8 ml-auto">
            <div className="border-black w-min-[500px] p-8 rounded-[15px] space-y-2 bg-customLightGrey">
              <h2 className="text-size16 font-bold mb-4">
                Récapitulatif de la commande
              </h2>
              <div className="flex justify-between">
                <p>Tous les articles</p> <p>{calculateTotalHT()} €</p>
              </div>
              <div className="flex justify-between">
                <p>TVA</p> <p>{calculateTaxe()} €</p>
              </div>
              <div className="flex justify-between">
                <p className="mb-1">Estimation de la livraison</p>{" "}
                <p>Offerte</p>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <p className="mb-8 mt-1">TOTAL</p> <p>{calculateTotal()} €</p>
              </div>
              <div className="flex-col justify-center space-y-4">
                {cartItems.length > 0 ? (
                  <Link to="/checkout">
                    <button className="btn btn-black mx-auto block">
                      Payer la commande
                    </button>
                  </Link>
                ) : (
                  <button
                    className="btn-disabled mx-auto block"
                    disabled
                    title="Ajouter des produits au panier pour payer la commande"
                  >
                    Payer la commande
                  </button>
                )}
                <Link
                  to={URL_HOME}
                  className="text-center text-customBlue font-semi-bold block"
                >
                  Poursuivre mes achats →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    // <div>
    //   <button onClick={handleClearCart}>Clear Cart</button>
    // </div>
  );
};

export default Cart;
