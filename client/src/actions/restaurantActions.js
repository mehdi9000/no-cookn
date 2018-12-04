import axios from 'axios';
// import swal from '@sweetalert/with-react';

import {
  GET_RESTAURANT,
  RESTAURANT_LOADING,
  GET_RESTAURANTS
  //   GET_ERRORS
} from './types';

var url;
if (process.env.NODE_ENV === 'production') {
  url = 'http://no-cookn.herokuapp.com';
} else {
  url = 'http://localhost:4001';
}

// Get RESTAURANT
export const getRestaurant = id => dispatch => {
  dispatch(setRestaurantLoading());
  axios
    .get(`${url}/api/restaurants-profile/${id}`)
    .then(res =>
      dispatch({
        type: GET_RESTAURANT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RESTAURANT,
        payload: null
      })
    );
};

// Get Posts
export const getRestaurants = () => dispatch => {
  dispatch(setRestaurantLoading());
  axios
    .get('/api/restaurants-profile/partners/all-profiles')
    .then(res =>
      dispatch({
        type: GET_RESTAURANTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RESTAURANTS,
        payload: null
      })
    );
};

// Set loading state
export const setRestaurantLoading = () => {
  return {
    type: RESTAURANT_LOADING
  };
};
