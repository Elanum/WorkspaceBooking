import axios from 'axios';
import { GET_BOOKINGS, BOOKINGS_ERROR } from './types';
import { authHeader, API_URL } from '../config/api.config';

const getAllBookings = () => async (dispatch) => {
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

// eslint-disable-next-line import/prefer-default-export
export { getAllBookings };
