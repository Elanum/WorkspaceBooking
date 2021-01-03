import axios from 'axios';
import { GET_ROOMS, ROOMS_ERROR } from './types';
import { authHeader, API_URL } from '../config/api.config';

const getRooms = () => async (dispatch) => {
  axios
    .get(`${API_URL}/rooms`, authHeader())
    .then(({ data }) => {
      dispatch({ type: GET_ROOMS, payload: data });
      dispatch({ type: ROOMS_ERROR, payload: '' });
    })
    .catch(({ response }) => {
      if (response) {
        dispatch({ type: ROOMS_ERROR, payload: response.data.message });
      } else {
        dispatch({ type: ROOMS_ERROR, payload: 'Network Error' });
      }
    });
};

// eslint-disable-next-line import/prefer-default-export
export { getRooms };
