import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { URL_HOME } from "../constants/urls/urlFrontEnd";

const TypeView = () => {
  const { slug } = useParams();
  const [type, setType] = useState(null);
  const [selectedSubtypes, setSelectedSubtypes] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const location = useLocation();

  // Réinitialiser les filtres lorsque l'emplacement (page) change
  useEffect(() => {
    setSelectedSubtypes([]);
    setMinPrice("");
    setMaxPrice("");
  }, [location.pathname]);

  useEffect(() => {
    const fetchType = async () => {
      try {
        const response = await axios.get(
          `https://localhost:8000/api/type/${slug}`
        );
        setType(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la catégorie :",
          error
        );
      }
    };

    fetchType();
  }, [slug]);

  if (!type) {
    return <p>Chargement en cours...</p>;
  }

  // FILTRE

  const handleCheckboxChange = (subtypeName) => {
    setSelectedSubtypes((prevSelected) => {
      if (prevSelected.includes(subtypeName)) {
        // Si le subtype est déjà sélectionné, le retirer
        return prevSelected.filter((name) => name !== subtypeName);
      } else {
        // Sinon, l'ajouter
        return [...prevSelected, subtypeName];
      }
    });
  };

  // Filtrer les produits en fonction des sous-types sélectionnés
  const filteredProducts =
    selectedSubtypes.length === 0
      ? type.slice(1).flatMap((subtype) => subtype.products)
      : type
          .slice(1)
          .filter((subtype) => selectedSubtypes.includes(subtype.name))
          .flatMap((subtype) => subtype.products);

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const filteredProductsByPrice = filteredProducts.filter((product) => {
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
        <Link to={URL_HOME}>Accueil</Link> | <Link>{type[0].name}</Link>
      </div>
      <div className="mx-auto max-w-screen-xl w-full p-4 bg-white">
        <div className="text-center">
          <h1 className="text-size32 font-bold mb-6">{type[0].name}</h1>
          <p className="mx-auto max-w-[650px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
            cumque voluptatibus unde neque nulla perspiciatis rerum nobis ullam
            animi excepturi, assumenda.
          </p>
        </div>
        <div className="flex mt-24">
          <div className="w-1/4 pr-14">
            <h2 className="border-b mb-6 pb-4 text-size16 font-bold">
              Catégories
            </h2>
            <ul className="space-y-2">
              {type.slice(1).map((subtype) => (
                <li key={subtype.name}>
                  <input
                    type="checkbox"
                    value={subtype.name}
                    checked={selectedSubtypes.includes(subtype.name)}
                    onChange={() => handleCheckboxChange(subtype.name)}
                    className="mr-2"
                  />
                  {subtype.name}
                </li>
              ))}{" "}
            </ul>
            {/* Ajouter des jauges (sliders) pour le prix */}
            <div>
              <h2 className="border-b mt-10 mb-6 pb-4 text-size16 font-bold">
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
          </div>
          <div className="w-3/4">
            <p className="mb-7">
              <span className="font-bold">
                {filteredProductsByPrice.length}
              </span>{" "}
              articles trouvés
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-14">
              {/* Afficher les produits filtrés par sous-types et prix */}
              {filteredProductsByPrice.map((product) => (
                <div key={product.id} className="mx-auto sm:mx-0">
                  {product.images.length > 0 && (
                    <Link to={`/produit/${product.slug}`}>
                      <img
                        src={`https://localhost:8000${product.images[0].url}`}
                        alt={product.images[0].name}
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

export default TypeView;
