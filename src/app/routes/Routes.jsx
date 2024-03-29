import React from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";

// Constants
import { ROLE_ADMIN } from "../constants/rolesConstant";
import * as URL from "../constants/urls/urlFrontEnd";

// Views
import AdminView from "../views/AdminView";
import HomeView from "../views/HomeView";
import AuthFormView from "../views/AuthFormView";
import ForgotPasswordView from "../views/ForgotPasswordView";
import ForgotPasswordEmailSentView from "../views/ForgotPasswordEmailSentView";
import MyAccountView from "../views/MyAccountView";
import ReturnItemView from "../views/ReturnItemView";
import MyOrdersView from "../views/MyOrdersView";
import ContactView from "../views/ContactView";
import ProductView from "../views/ProductView";
import TypeView from "../views/TypeView";
import SubtypeView from "../views/SubtypeView";

// Components
import { PrivateRoute } from "./PrivateRoute";
import UsersList from "../components/account/Admin/UsersList/UsersList";
import ReportsList from "../components/account/Admin/ReportsList/ReportsList";
import Profile from "../components/account/Admin/Profile/Profile";
import Cart from "../views/CartView";
import CheckoutForm from "../components/account/Payment/CheckoutForm";
import Return from "../components/account/Payment/Return";

// Contexts
import { FormValidationProvider } from "../contexts/FormValidationContext";

/**
 * Routes of the application
 * with public and private route
 */

const Routes = ({ stripePromise }) => {
  return (
    <FormValidationProvider>
      <RoutesContainer>
        {/* Public Routes */}
        <Route path={URL.URL_HOME} element={<HomeView />} />
        <Route path={URL.URL_CONTACT} element={<ContactView />} />
        <Route path={URL.URL_AUTHFORM} element={<AuthFormView />} />
        <Route
          path={URL.URL_FORGOT_PASSWORD}
          element={<ForgotPasswordView />}
        />
        <Route
          path={URL.URL_FORGOT_PASSWORD_EMAIL_SENT}
          element={<ForgotPasswordEmailSentView />}
        />
        <Route path={URL.URL_PRODUCT} element={<ProductView />} />
        <Route path={URL.URL_TYPE} element={<TypeView />} />
        <Route path={URL.URL_SUBTYPE} element={<SubtypeView />} />
        {/* Private Routes */}
        {/* ADMIN*/}
        <Route
          path={URL.URL_ADMIN}
          element={
            <PrivateRoute roles={[ROLE_ADMIN]}>
              <AdminView />
            </PrivateRoute>
          }
        >
          <Route
            path={URL.URL_USERSLIST}
            element={
              <PrivateRoute roles={[ROLE_ADMIN]}>
                <UsersList />
              </PrivateRoute>
            }
          />{" "}
          <Route
            path={URL.URL_REPORTSLIST}
            element={
              <PrivateRoute roles={[ROLE_ADMIN]}>
                <ReportsList />
              </PrivateRoute>
            }
          />
          <Route
            path={URL.URL_ADMIN_DASHBOARD}
            element={
              <PrivateRoute roles={[ROLE_ADMIN]}>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>
        {/* UTILISATEURS*/}
        <Route
          path={URL.URL_PAYMENT_CHECKOUT}
          element={
            <PrivateRoute>
              <CheckoutForm stripePromise={stripePromise} />
            </PrivateRoute>
          }
        />
        <Route
          path={URL.URL_PAYMENT_RETURN}
          element={
            <PrivateRoute>
              <Return />
            </PrivateRoute>
          }
        />
        <Route
          path={URL.URL_CART}
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path={URL.URL_MY_ACCOUNT}
          element={
            <PrivateRoute>
              <MyAccountView />
            </PrivateRoute>
          }
        />
        <Route
          path={URL.URL_MY_ORDERS}
          element={
            <PrivateRoute>
              <MyOrdersView />
            </PrivateRoute>
          }
        />
        <Route
          path={URL.URL_RETURN_ITEM}
          element={
            <PrivateRoute>
              <ReturnItemView />
            </PrivateRoute>
          }
        />
      </RoutesContainer>
    </FormValidationProvider>
  );
};

export default Routes;
