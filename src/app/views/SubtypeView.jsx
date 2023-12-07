import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { URL_HOME } from "../constants/urls/urlFrontEnd";
import Logo from "../assets/images/icons/aquaelixir.ico";

const SubtypeView = () => {
  const { slug } = useParams();
  const [subtype, setSubtype] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const location = useLocation();

  // Réinitialiser les filtres lorsque l'emplacement (page) change
  useEffect(() => {
    setMinPrice("");
    setMaxPrice("");
  }, [location.pathname]);

  useEffect(() => {
    const fetchSubtype = async () => {
      try {
        const response = await axios.get(
          `https://localhost:8000/api/subtype/${slug}`
        );
        setSubtype(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

    fetchSubtype();
  }, [slug]);

  if (!subtype) {
    return (
      <div className="mx-auto p-5 max-w-screen-xl w-full h-full bg-white flex justify-center items-center">
        <img src={Logo} alt="logo" className="loading" />
      </div>
    );
  }

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const filteredProductsByPrice = subtype.products.filter((product) => {
    const price = parseFloat(product.price);
    const min =
      minPrice !== "" ? parseFloat(minPrice) : Number.MIN_SAFE_INTEGER;
    const max =
      maxPrice !== "" ? parseFloat(maxPrice) : Number.MAX_SAFE_INTEGER;

    return price >= min && price <= max;
  });

  return (
    <>
      <div className="max-w-screen-xl mx-auto pl-4 py-5 text-sm font-medium">
        <Link to={URL_HOME}>Accueil</Link> |{" "}
        <Link to={`/categorie/${subtype.parent.slug}`}>
          {subtype.parent.name}
        </Link>{" "}
        | <Link>{subtype.name}</Link>
      </div>
      <div className="mx-auto max-w-screen-xl p-4 w-full bg-white">
        <div className="text-center">
          <h1 className="text-size32 font-bold mb-6">{subtype.name}</h1>
          <p className="mx-auto max-w-[650px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
            cumque voluptatibus unde neque nulla perspiciatis rerum nobis ullam
            animi excepturi, assumenda.
          </p>
        </div>{" "}
        <div className="flex mt-24">
          <div className="w-1/4 pr-14">
            {/* Ajouter des jauges (sliders) pour le prix */}
            <h2 className="border-b mb-6 pb-4 text-size16 font-bold">
              Prix
            </h2>
            <div className="flex gap-2 mb-1 items-center">
              <label className="mb-1">Mini&nbsp;:</label>
              <input
                type="range"
                min="10"
                max="50"
                step="10"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
              {minPrice !== "" && <span>{minPrice}&nbsp;€</span>}
            </div>
            <div className="flex gap-2 items-center">
              <label className="mb-1">Max&nbsp;:</label>
              <input
                id="slider"
                type="range"
                min="20"
                max="80"
                step="10"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
              {maxPrice !== "" && <span>{maxPrice}&nbsp;€</span>}
            </div>
          </div>
          <div className="w-3/4">
            <p className="mb-7">
              <span className="font-bold">
                {filteredProductsByPrice.length}
              </span>{" "}
              articles trouvés
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-14">
              {filteredProductsByPrice.map((product) => (
                <div key={product.id} className="mx-auto sm:mx-0">
                  {product.images.length > 0 && (
                    <Link to={`/produit/${product.slug}`}>
                      <img
                        src={`https://localhost:8000${product.images[0].url}`}
                        alt={product.name}
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
        </div>
      </div>
    </>
  );
};

export default SubtypeView;
