import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { signIn, selectHasRole } from "./redux-store/authenticationSlice";
import Routes from "./routes/Routes";
import { getToken } from "./services/tokenServices";
import { ROLE_ADMIN } from "./constants/rolesConstant";
import { loadStripe } from '@stripe/stripe-js';

const contextClass = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
  warning: "bg-yellow-500",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

const stripePromise = loadStripe(
  "pk_test_51ONM1hBLaSzPsyD6g1yO56WoZFF0BiM0y7o14uf0wrJYfF5KEchgnbIzEh62L637TOX7Vcvi0U1zsa4r38KkexTI00TRuj6Oq2"
);

/**
 * Component RouteWithNavigation
 * To create the structure of the application (nav bar, routes, toast, etc...)
 *
 */
const App = () => {
  const isAdmin = useSelector((state) => selectHasRole(state, ROLE_ADMIN));
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) dispatch(signIn(token));
    setIsLogin(false);
  }, []);

  if (isLogin) return null;

  return (
    <BrowserRouter>
      <div className="relative flex cursor-default flex-col font-satoshiVariable">
        {!isAdmin && <Navbar />}
        <main className="grow">
          <Routes stripePromise={stripePromise} />
        </main>
        <ToastContainer
          toastClassName={({ type }) =>
            contextClass[type || "default"] +
            " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
          }
          bodyClassName={() => "text-sm font-white font-med block p-3"}
          position="bottom-left"
          autoClose={3000}
        />
        {!isAdmin && <Footer />}
      </div>
    </BrowserRouter>
  );
};

export default App;
