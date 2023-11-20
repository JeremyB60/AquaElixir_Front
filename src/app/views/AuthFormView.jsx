import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import Login from "../components/account/Login";
import Register from "../components/account/Register";

import { selectIsLogged } from "../redux-store/authenticationSlice";

import { URL_HOME } from "../constants/urls/urlFrontEnd";

const AuthFormView = () => {
  // Hooks
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsLogged);
  const [isToggle, setIsToggle] = React.useState(false);

  // Effect
  useEffect(() => {
    if (isAuthenticated) {
      navigate(URL_HOME);
    }
  }, [isAuthenticated, navigate]);

  // Spring animation
  const cardFlip = useSpring({
    transform: `rotateY(${isToggle ? 180 : 0}deg)`,
  });

  return (
    <div className="mx-auto max-w-screen-xl w-full bg-white">
      <animated.div className="cardContainer" style={cardFlip}>
        <div className="card">
          <div className="cardFront">
            {!isToggle && <Login toggle={() => setIsToggle(!isToggle)} />}
          </div>
          <div className="cardBack">
            {isToggle && (
              <animated.div style={{ transform: `rotateY(180deg)` }}>
                <Register toggle={() => setIsToggle(!isToggle)} />
              </animated.div>
            )}
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default AuthFormView;
