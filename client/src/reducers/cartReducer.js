import { ADD_TO_CART } from '../actions/types';
import { REMOVE_FROM_CART } from '../actions/types';

// const initialState = [];

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
