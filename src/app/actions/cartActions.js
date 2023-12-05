// Action type constants
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_ITEM = "UPDATE_CART_ITEM";
export const CLEAR_CART = "CLEAR_CART";

// Action creator functions

// Action to add a product to the cart
export const addToCart = (
  productId,
  productName,
  productType,
  productImage,
  productMesurement,
  productPrice,
  productTaxe,
  quantity
) => ({
  type: ADD_TO_CART,
  payload: {
    productId,
    productName,
    productType,
    productImage,
    productMesurement,
    productPrice,
    productTaxe,
    quantity,
  },
});

// Action to remove a product from the cart
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: {
    productId,
  },
});

// Action to update the quantity of a product in the cart
export const updateCartItem = (productId, quantity) => ({
  type: UPDATE_CART_ITEM,
  payload: {
    productId,
    quantity,
  },
});

// Action to clear the entire cart
export const clearCart = () => ({
  type: CLEAR_CART,
});

// Other cart-related actions can be added here
// export const applyDiscount = (discountCode) => { ... };
