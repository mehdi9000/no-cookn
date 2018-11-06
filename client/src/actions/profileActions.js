import axios from 'axios';
import swal from '@sweetalert/with-react';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('http://localhost:4001/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('http://localhost:4001/api/profile', profileData)
    .then(res => {
      console.log(res.data);
      // history.push('/dashboard');
      swal({
        title: 'Success',
        text: 'Profile updated succesfully.',
        icon: 'success'
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// Create Profile
export const createAddress = addressData => dispatch => {
  axios
    .post('http://localhost:4001/api/profile/address', addressData)
    .then(res => {
      console.log(res.data);
      swal({
        title: 'Success',
        text: 'Profile updated succesfully.',
        icon: 'success'
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

export const deleteAddress = id => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete(`http://localhost:4001/api/profile/address/${id}`)
      .then(res => {
        console.log(res.data);
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        });
        setTimeout(() => {
          window.location.reload();
        }, 0);
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error
        });
      });
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
