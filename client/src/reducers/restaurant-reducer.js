import {
  GET_RESTAURANT,
  GET_RESTAURANTS,
  RESTAURANT_LOADING
} from '../actions/types';

const initialState = {
  restaurant: {},
  restaurants: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESTAURANT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_RESTAURANT:
      return {
        ...state,
        restaurant: action.payload,
        loading: false
      };
    case GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
