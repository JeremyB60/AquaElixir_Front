import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SubMenu = ({
  menuItems,
  styles,
  toggleSubMenu,
  closeSubMenu,
  isVisible,
}) => {
  const subMenuRef = useRef();

  const handleOutsideClick = (e) => {
    if (e.target.id === `afficherSousMenuButton${menuItems.id}`) return;

    if (subMenuRef.current && !subMenuRef.current.contains(e.target)) {
      closeSubMenu(menuItems.id);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <>
      <button
        id={`afficherSousMenuButton${menuItems.id}`}
        onClick={() => toggleSubMenu(menuItems.id)}
        className="hover:text-customBlue"
      >
        {menuItems.label}
        {isVisible ? "⏷" : "⏵"}
      </button>
      {isVisible && (
        <ul
          className={`absolute bg-white border w-full flex flex-wrap justify-evenly p-8`}
          style={{
            top: "70px",
            left: "0",
            margin: "0",
            ...styles,
          }}
          id={`sousMenu${menuItems.id}`}
          ref={subMenuRef}
        >
          {menuItems.items.map((subItem) => (
            <li key={subItem.id} className="justify-center max-w-full">
              <div className="sm:col-span-1 flex flex-col">
                <Link
                  to={subItem.url}
                  onClick={() => {
                    closeSubMenu(menuItems.id);
                  }}
                  className="link inline-block font-extrabold mb-3"
                >
                  {subItem.label}
                </Link>
                {subItem.subItems && subItem.subItems.length > 0 && (
                  <ul key={subItem.id}>
                    {subItem.subItems.map((nestedItem) => (
                      <li key={nestedItem.id}>
                        <Link
                          to={nestedItem.url}
                          onClick={() => {
                            closeSubMenu(menuItems.id);
                          }}
                          className="link inline-block"
                        >
                          {nestedItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

SubMenu.propTypes = {
  menuItems: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        subItems: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
          })
        ),
      })
    ),
  }).isRequired,
  isVisible: PropTypes.bool.isRequired,
  toggleSubMenu: PropTypes.func.isRequired,
  closeSubMenu: PropTypes.func.isRequired,
  styles: PropTypes.object,
};

export default SubMenu;
