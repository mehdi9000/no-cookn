import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART
} from '../actions/types';

// use item id when connected to api
const cartWithoutItem = (cart, item) =>
  cart.filter(cartItem => cartItem.id !== item.id);

let itemInCart = (cart, item) =>
  cart.filter(cartItem => cartItem.id === item.id)[0];

const addToCart = (cart, item) => {
  const cartItem = itemInCart(cart, item);
  return cartItem === undefined
    ? [...cartWithoutItem(cart, item), { ...item, quantity: 1 }]
    : [
        ...cartWithoutItem(cart, item),
        { ...cartItem, quantity: cartItem.quantity + 1 }
      ];
};

const removeItemFromCart = (cart, item) => {
  return item.quantity === 1
    ? [...cartWithoutItem(cart, item)]
    : [
        ...cartWithoutItem(cart, item),
        { ...item, quantity: item.quantity - 1 }
      ];
};

const removeAllFromCart = (cart, item) => {
  return [...cartWithoutItem(cart, item)];
};

export default function(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return addToCart(state, action.payload);

    case REMOVE_FROM_CART:
      return removeItemFromCart(state, action.payload);

    case REMOVE_ALL_FROM_CART:
      return removeAllFromCart(state, action.payload);

    default:
      return state;
  }
}
