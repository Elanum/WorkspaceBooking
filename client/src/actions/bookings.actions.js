import axios from 'axios';
import { GET_BOOKINGS, POST_BOOKINGS, BOOKINGS_ERROR } from './types';
import { authHeader, API_URL } from '../config/api.config';

const getBookings = () => async (dispatch) => {
  axios
    .get(`${API_URL}/bookings`, authHeader())
    .then(({ data }) => {
      dispatch({ type: GET_BOOKINGS, payload: data });
      dispatch({ type: BOOKINGS_ERROR, payload: '' });
    })
    .catch(({ response }) => {
      dispatch({ type: BOOKINGS_ERROR, payload: response.data.message });
    });
};

const postBookings = (props, callback) => async (dispatch) => {
  axios
    .post(`${API_URL}/bookings`, props, authHeader())
    .then(({ data }) => {
      dispatch({ type: POST_BOOKINGS, payload: data });
      dispatch({ type: BOOKINGS_ERROR, payload: '' });
      callback();
    })
    .catch(({ response }) => {
      dispatch({ type: BOOKINGS_ERROR, payload: response.data.message });
    });
};

export { getBookings, postBookings };
