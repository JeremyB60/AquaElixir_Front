import React from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";

// Constants
import { ROLE_ADMIN, ROLE_USER } from "../constants/rolesConstant";
import * as URL from "../constants/urls/urlFrontEnd";

// Views
import AdminHomeView from "../views/AdminHomeView";
import HomeView from "../views/HomeView";
import AuthFormView from "../views/AuthFormView";
import ForgotPasswordView from "../views/ForgotPasswordView";
import ForgotPasswordEmailSentView from "../views/ForgotPasswordEmailSentView";
import MyAccountView from "../views/MyAccountView";
import ReturnItemView from "../views/ReturnItemView";
import MyOrdersView from "../views/MyOrdersView";

// Components
import { FormValidationProvider } from "../components/account/FormValidationContext";
import { PrivateRoute } from "./PrivateRoute";


/**
 * Routes of the application
 * with public and private route
 */

const Routes = () => {
  return (
    <FormValidationProvider>
      <RoutesContainer>
        {/* Public Routes */}
        <Route path={URL.URL_HOME} element={<HomeView />} />
        <Route path={URL.URL_AUTHFORM} element={<AuthFormView />} />
        <Route path={URL.URL_FORGOT_PASSWORD} element={<ForgotPasswordView />} />
        <Route path={URL.URL_FORGOT_PASSWORD_EMAIL_SENT} element={<ForgotPasswordEmailSentView />} />

        {/* Private Routes */}
        <Route
          path={URL.URL_ADMIN_HOME}
          element={<PrivateRoute roles={[ROLE_ADMIN]}><AdminHomeView /></PrivateRoute>}
        />
        <Route
          path={URL.URL_MY_ACCOUNT}
          element={<PrivateRoute roles={[ROLE_USER]}><MyAccountView /></PrivateRoute>}
        />
        <Route
          path={URL.URL_MY_ORDERS}
          element={<PrivateRoute roles={[ROLE_USER]}><MyOrdersView /></PrivateRoute>}
        />
        <Route
          path={URL.URL_RETURN_ITEM}
          element={<PrivateRoute roles={[ROLE_USER]}><ReturnItemView /></PrivateRoute>}
        />
      </RoutesContainer>
    </FormValidationProvider>
  );
};


export default Routes;
