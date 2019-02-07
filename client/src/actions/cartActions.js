import { ADD_TO_CART, REMOVE_FROM_CART } from './types';

export const cartItemsWithQuantities = cartItems => {
  return cartItems.reduce((acc, item) => {
    const filteredItems = acc.filter(item2 => item2.id === item.id)[0];
    filteredItems !== undefined
      ? filteredItems.quantity++
      : acc.push({ ...item, quantity: 1 });
    return acc;
  }, []);
};

export const addToCart = item => dispatch => {
  dispatch({ type: ADD_TO_CART, payload: item });
  console.log(item);
};

export const removeFromCart = item => dispatch => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: item
  });
  console.log(item);
};
