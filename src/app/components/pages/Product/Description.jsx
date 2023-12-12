import React, { useState } from "react";
import Image from "../../../assets/images/productDescription.jpg";

const Description = ({ productName }) => {
  const [beneficeVisible, setBeneficeVisible] = useState(true);
  const [modeApplicationVisible, setModeApplicationVisible] = useState(true);
  const [ingredientsVisible, setIngredientsVisible] = useState(true);

  const toggleContent = (section) => {
    switch (section) {
      case "benefice":
        setBeneficeVisible(!beneficeVisible);
        break;
      case "modeApplication":
        setModeApplicationVisible(!modeApplicationVisible);
        break;
      case "ingredients":
        setIngredientsVisible(!ingredientsVisible);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex mb-16">
      <div className="w-full xl:max-w-[750px] space-y-3 pr-0 xl:pr-16">
        <h3 className="text-size24 font-bold mb-10">
          En savoir plus sur le produit
        </h3>
        <h4
          className="text-size16 uppercase font-semibold flex justify-between items-center cursor-pointer"
          onClick={() => toggleContent("benefice")}
        >
          Bénéfice
          {beneficeVisible ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3094_522)">
                <path
                  d="M6 15L12 9L18 15"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3094_522">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3094_522)">
                <path
                  d="M6 9L12 15L18 9"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3094_522">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
        </h4>
        <hr />
        <div
          className={`content ${
            beneficeVisible ? "visibleDescription" : "hiddenDescription"
          }`}
        >
          <p className="pb-4">
            Hydratation en profondeur: Le concombre de mer pénètre profondément
            dans les cheveux, les hydratant de l'intérieur. Réparation et
            brillance: La kératine renforce la structure capillaire, minimise
            les pointes fourchues et la casse, et contribue à une chevelure plus
            lisse et plus brillante. Protection contre les agressions
            extérieures: En renforçant la barrière capillaire, ce masque protège
            vos cheveux des dommages causés par les éléments et les appareils
            chauffants.
          </p>
        </div>
        <h4
          className="text-size16 uppercase font-semibold flex justify-between items-center cursor-pointer"
          onClick={() => toggleContent("modeApplication")}
        >
          Mode Application
          {modeApplicationVisible ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3094_522)">
                <path
                  d="M6 15L12 9L18 15"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3094_522">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3094_522)">
                <path
                  d="M6 9L12 15L18 9"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3094_522">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
        </h4>
        <hr />
        <div
          className={`content ${
            modeApplicationVisible ? "visibleDescription" : "hiddenDescription"
          }`}
        >
          <p className="pb-4">
            Après le shampooing, appliquez une quantité généreuse du masque
            capillaire sur vos cheveux mouillés, en évitant les racines. Laissez
            agir pendant 5 à 10 minutes pour permettre aux ingrédients de
            pénétrer. Rincez abondamment à l'eau tiède. Utilisez ce masque
            capillaire une à deux fois par semaine pour des résultats optimaux.
          </p>
        </div>
        <h4
          className="text-size16 uppercase font-semibold flex justify-between items-center cursor-pointer"
          onClick={() => toggleContent("ingredients")}
        >
          Ingrédients
          {ingredientsVisible ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3094_522)">
                <path
                  d="M6 15L12 9L18 15"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3094_522">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3094_522)">
                <path
                  d="M6 9L12 15L18 9"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3094_522">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
        </h4>
        <hr />
        <div
          className={`content ${
            ingredientsVisible ? "visibleDescription" : "hiddenDescription"
          }`}
        >
          <p className="pb-4">
            Eau (Aqua), Kératine hydrolysée (Hydrolyzed Keratin), Extrait de
            concombre de mer (Holothuria tubulosa Extract), Glycérine
            (Glycerin), Guar hydroxypropyltrimonium chloride, Caesalpinia
            spinosa gum, Alcool cétylique (Cetyl Alcohol), Parfum (Fragrance),
            Acide citrique.
          </p>
        </div>
      </div>
      <div className="w-1/2 pt-[100px] hidden xl:block">
        <img src={Image} alt={productName} className="ml-auto" />
      </div>
    </div>
  );
};

export default Description;
