import { ADD_TO_CART, REMOVE_FROM_CART } from './types';

export const addToCart = item => dispatch => {
  console.log(`ACTION: adding ${item} to cart`);
  return dispatch({
    type: ADD_TO_CART,
    payload: item
  });
};

export const removeFromCart = item => dispatch => {
  console.log(`ACTION: removing ${item} from cart`);
  return dispatch({
    type: REMOVE_FROM_CART,
    payload: item
  });
};
