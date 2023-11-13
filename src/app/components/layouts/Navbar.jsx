import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsLogged,
  signOut,
} from "./../../redux-store/authenticationSlice";
import { URL_HOME, URL_LOGIN } from "../../constants/urls/urlFrontEnd";
import Logo from "./../../assets/images/logo.svg";
import Search from "./../../assets/images/icons/search_icon.svg";
import User from "./../../assets/images/icons/user_icon.svg";
import Cart from "./../../assets/images/icons/shop-bag_icon.svg";
import SubMenu from "./SubMenu";

const Navbar = () => {
  const toggleSubMenu = (menuId) => {
    setVisibleMenus((prevVisibleMenus) => ({
      ...prevVisibleMenus,
      [menuId]: !prevVisibleMenus[menuId],
    }));
  };

  const closeSubMenu = (menuId) => {
    setVisibleMenus((prevVisibleMenus) => ({
      ...prevVisibleMenus,
      [menuId]: false,
    }));
  };

  const isLoggued = useSelector(selectIsLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate(URL_LOGIN);
  };

  const menuItems1 = {
    id: 1,
    label: "Soin",
    items: [
      {
        label: "Soin du visage",
        url: URL_HOME,
        subItems: [
          { label: "Anti-âge", url: URL_HOME },
          { label: "Crème hydratante", url: URL_HOME },
          { label: "Masque", url: URL_HOME },
          { label: "Sérum", url: URL_HOME },
          { label: "Contour des yeux", url: URL_HOME },
          { label: "Nettoyant", url: URL_HOME },
        ],
      },
      {
        label: "Soin corporel",
        url: URL_HOME,
        subItems: [
          { label: "Nettoyant", url: URL_HOME },
          { label: "Gommage", url: URL_HOME },
          { label: "Huile", url: URL_HOME },
        ],
      },
      {
        label: "Soin capillaire",
        url: URL_HOME,
        subItems: [
          { label: "Shampoing", url: URL_HOME },
          { label: "Après-Shampoing", url: URL_HOME },
          { label: "Masque capillaire", url: URL_HOME },
          { label: "Sérum capillaire", url: URL_HOME },
        ],
      },
      {
        label: "Kit et coffret",
        url: URL_HOME,
        subItems: [
          { label: "Coffret cadeau", url: URL_HOME },
          { label: "Lot de produits", url: URL_HOME },
        ],
      },
    ],
  };

  const menuItems2 = {
    id: 2,
    label: "Parapharmacie",
    items: [
      {
        label: "Compléments alimentaires",
        url: URL_HOME,
        subItems: [
          { label: "Peau, cheveux et ongles", url: URL_HOME },
          { label: "Tisane, thé et infusion", url: URL_HOME },
          { label: "Digestion et transit", url: URL_HOME },
          { label: "Articulation", url: URL_HOME },
          { label: "Superaliment", url: URL_HOME },
        ],
      },
      {
        label: "Santé & bien-être",
        url: URL_HOME,
        subItems: [
          { label: "Anti-acné et imperfections", url: URL_HOME },
          { label: "Soin spécifique cheveux", url: URL_HOME },
          { label: "Minceur et anti-cellulite", url: URL_HOME },
          { label: "Immunité", url: URL_HOME },
          { label: "Produit anti-infectieux", url: URL_HOME },
          { label: "Probiotique", url: URL_HOME },
        ],
      },
      {
        label: "Protection solaire",
        url: URL_HOME,
        subItems: [
          { label: "Crème solaire SPF 30", url: URL_HOME },
          { label: "Crème solaire SPF 50", url: URL_HOME },
          { label: "Lotion après-soleil", url: URL_HOME },
        ],
      },
    ],
  };

  const [visibleMenus, setVisibleMenus] = useState({
    [menuItems1.id]: false,
    [menuItems2.id]: false,
  });

  const generateIds = (menu, baseId = 1) => {
    let currentId = baseId;

    const generateIdRecursive = (item) => {
      item.id = currentId++;

      if (item.subItems && item.subItems.length > 0) {
        item.subItems.forEach(generateIdRecursive);
      }
    };

    menu.items.forEach(generateIdRecursive);
  };

  // Usage
  generateIds(menuItems1);
  generateIds(menuItems2);

  return (
    <nav className="top-0 w-full z-10 sticky font-satoshiMedium">
      <div className="mx-auto max-w-screen-xl w-full bg-white sm:px-7">
        <div className="flex items-center justify-between">
          <div>
            <Link to={URL_HOME}>
              <img
                className="cursor-pointer ml-4 sm:ml-0"
                src={Logo}
                alt="logo"
                width={180}
                height={60}
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-2 lg:space-x-10 justify-center">
              <Link to={URL_HOME} className="link inline-block">
                Nouveautés
              </Link>
              <SubMenu
                isVisible={visibleMenus[menuItems1.id]}
                toggleSubMenu={toggleSubMenu}
                closeSubMenu={closeSubMenu}
                menuItems={menuItems1}
              />
              <SubMenu
                isVisible={visibleMenus[menuItems2.id]}
                toggleSubMenu={toggleSubMenu}
                closeSubMenu={closeSubMenu}
                menuItems={menuItems2}
              />
              <Link to={URL_HOME}>
                <div className="link">À&nbsp;propos</div>
              </Link>
              <Link to={URL_HOME}>
                <div className="link">Contact</div>
              </Link>
            </div>
          </div>
          <div>
            <div className="flex space-x-4">
              <Link to={URL_LOGIN}>
                <img src={Search} title="Recherche" alt="Recherche" />
              </Link>
              <Link to={URL_LOGIN}>
                <img
                  src={User}
                  alt="Connexion"
                  title="Espace Client"
                  className="ml-3"
                />
              </Link>
              <Link to={URL_LOGIN}>
                <img
                  src={Cart}
                  alt="Panier"
                  title="Panier"
                  className="mr-4 sm:mr-0"
                />
              </Link>
              {isLoggued && (
                <button className="btn btn-dark" onClick={handleSignOut}>
                  Déconnexion
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
