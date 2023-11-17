import React from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";

import { ROLE_ADMIN } from "../constants/rolesConstant";
import * as URL from "../constants/urls/urlFrontEnd";
import AdminHomeView from "../views/AdminHomeView";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import { FormValidationProvider } from "../components/account/FormValidationContext";
import ForgotPasswordView from "../views/ForgotPasswordView";
import ForgotPasswordEmailSentView from "../views/ForgotPasswordEmailSentView";

import { PrivateRoute } from "./PrivateRoute";

/**
 * Routes of the application
 * with public and private route
 */

const Routes = () => {
  return (
    <FormValidationProvider>
      <RoutesContainer>
        <Route
          path={URL.URL_ADMIN_HOME}
          element={
            <PrivateRoute roles={[ROLE_ADMIN]}>
              <AdminHomeView />
            </PrivateRoute>
          }
        />
        <Route
          path={URL.URL_HOME}
          element={
            <PrivateRoute>
              <HomeView />
            </PrivateRoute>
          }
        />
        <Route path={URL.URL_LOGIN} element={<LoginView />} />
        <Route path={URL.URL_REGISTER} element={<RegisterView />} />
        <Route
          path={URL.URL_FORGOT_PASSWORD}
          element={<ForgotPasswordView />}
        />
        <Route
          path={URL.URL_FORGOT_PASSWORD_EMAIL_SENT}
          element={<ForgotPasswordEmailSentView />}
        />
      </RoutesContainer>
    </FormValidationProvider>
  );
};

export default Routes;
