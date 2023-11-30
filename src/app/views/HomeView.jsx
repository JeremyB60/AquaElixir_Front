import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ROLE_ADMIN } from "../constants/rolesConstant";
import { URL_ADMIN_DASHBOARD } from "../constants/urls/urlFrontEnd";
import { selectHasRole } from "../redux-store/authenticationSlice";
import { newProducts, popularProducts } from "../api/backend/home";

const HomeView = () => {
  // Redirection si ROLE_ADMIN
  const isAdmin = useSelector((state) => selectHasRole(state, ROLE_ADMIN));
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate(URL_ADMIN_DASHBOARD);
    }
  }, [isAdmin, navigate]);

  // Récupération des produits
  const [isNewProducts, setIsNewProducts] = useState([]);
  const [isPopularProducts, setIsPopularProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response1 = await newProducts();
        setIsNewProducts(response1.data);

        const response2 = await popularProducts();
        setIsPopularProducts(response2.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="p-5 w-full backgroundAccueil relative">
        <div className="textAccueil absolute space-y-3 xxl:right-[20%]">
          <h1 className="text-md">Coffret soin cheveux</h1>
          <p>
            Élégant coffret soin capillaire, luxueux assortiment pour cheveux
            sublimes et revitalisés.
          </p>
          <button className="btn btn-black">Découvrir le coffret</button>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl w-full bg-white p-8">
        <div className="relative">
          <h2 className="text-2xl font-bold my-10 uppercase">Nouveautés</h2>
          <Link className="absolute font-semibold top-9 sm:top-0 right-100 sm:-right-0">
            Voir toutes les nouveautés →
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-14">
            {isNewProducts.map((product) => (
              <div key={product.id} className="mx-auto sm:mx-0">
                {product.images.length > 0 && (
                  <Link to={`/produit/${product.slug}`}>
                    <img
                      src={`https://localhost:8000${product.images[0].url}`}
                      alt={product.images[0].alt}
                      className="mb-3 mx-auto"
                    />
                  </Link>
                )}
                <h3 className="text-size16 font-semibold mb-1">
                  {product.name}
                </h3>
                <p className="mb-2">{product.price} €</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <h2 className="text-2xl font-bold mb-10 uppercase">
            Produits Populaires
          </h2>
          <Link className="absolute font-semibold top-9 sm:top-0 right-100 sm:-right-0">
            Voir tous les produits populaires →
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-14">
            {isPopularProducts.map((product) => (
              <div key={product.id} className="mx-auto sm:mx-0">
                {product.images.length > 0 && (
                  <Link to={`/produit/${product.slug}`}>
                    <img
                      src={`https://localhost:8000${product.images[0].url}`}
                      alt={product.images[0].alt}
                      className="mb-3 mx-auto"
                    />
                  </Link>
                )}
                <h3 className="text-size16 font-semibold mb-1">
                  {product.name}
                </h3>
                <p className="mb-2">{product.price} €</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <h2 className="text-2xl font-bold mb-10 uppercase">
            Nos engagements
          </h2>
          <Link className="absolute font-semibold top-9 sm:top-0 right-100 sm:-right-0">
            En savoir plus sur les marques →
          </Link>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10 lg:mb-20 gap-y-3"> */}
          <div className="flex flex-wrap justify-between mb-10 gap-y-3">
            <div className="engagement engagement1">
              durabilité de la récolte
            </div>
            <div className="engagement engagement2">
              recherche et innovation
            </div>
            <div className="engagement engagement3">respect de l'océan</div>
            <div className="engagement engagement4">qualité et sécurité</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeView;
