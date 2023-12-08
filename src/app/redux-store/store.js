import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PERSIST } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authenticationReducer from "./authenticationSlice";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";

// Configuration de la persistance pour le reducer de panier (cartReducer)
const cartPersistConfig = {
  key: "cart",
  storage,
};

// Configuration de la persistance pour le reducer d'utilisateur (userReducer)
const userPersistConfig = {
  key: "user",
  storage,
};

// Application de la persistance au reducer de panier
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    cart: persistedCartReducer, // Utilisez le reducer persisté pour le panier
    user: persistedUserReducer, // Utilisez le reducer persisté pour l'utilisateur
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
