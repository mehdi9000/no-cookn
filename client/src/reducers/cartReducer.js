import { ADD_TO_CART } from '../actions/types';
import { REMOVE_FROM_CART } from '../actions/types';

// use item id when connected to api
// const cartWithoutItem = (cart, item) =>
//   cart.filter(cartItem => cartItem !== item);

// const itemInCart = (cart, item) =>
//   cart.filter(cartItem => cartItem === item)[0];

// const addToCart = (cart, item) => {
//   const cartItem = itemInCart(cart, item);
//   return cartItem === undefined
//     ? [...cartWithoutItem(cart, item), item, item.length]
//     : [...cartWithoutItem(cart, item), cartItem, cartItem.length];
// };

export default function(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];

    case REMOVE_FROM_CART:
      const firstMatchIndex = state.indexOf(action.payload);
      return state.filter((item, index) => index !== firstMatchIndex);

    default:
      return state;
  }
}
