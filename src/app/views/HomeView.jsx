import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ROLE_ADMIN } from "../constants/rolesConstant";
import { URL_ADMIN_DASHBOARD } from "../constants/urls/urlFrontEnd";
import { selectHasRole } from "../redux-store/authenticationSlice";

const HomeView = () => {
  const isAdmin = useSelector((state) => selectHasRole(state, ROLE_ADMIN));
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate(URL_ADMIN_DASHBOARD);
    }
  }, [isAdmin, navigate]);

  return (
    <div className="mx-auto max-w-screen-xl w-full bg-white">
      <div>
        
      </div>
    </div>
  );
};

export default HomeView;
