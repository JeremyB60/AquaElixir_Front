// cartReducer.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  CLEAR_CART,
} from "../actions/cartActions";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingItemIndex !== -1) {
        // Si le produit existe déjà, mettez à jour la quantité sans muter l'état
        return {
          ...state,
          items: state.items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        // Si le produit n'existe pas, ajoutez-le au panier sans muter l'état
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }

    case REMOVE_FROM_CART:
      const updatedItemsRemove = state.items.filter(
        (item) => item.productId !== action.payload.productId
      );

      return {
        ...state,
        items: updatedItemsRemove,
      };

    case UPDATE_CART_ITEM:
      const updatedItemsUpdate = state.items.map((item) => {
        if (item.productId === action.payload.productId) {
          return {
            ...item,
            quantity: action.payload.quantity,
          };
        }
        return item;
      });

      return {
        ...state,
        items: updatedItemsUpdate,
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    // Gérez d'autres actions de panier ici...

    default:
      return state;
  }
};

export default cartReducer;
