import axios from 'axios';
import { BOOKINGS_ERROR, GET_WORKSPACES, WORKSPACES_ERROR } from './types';
import { authHeader, API_URL } from '../config/api.config';

const getWorkspaces = () => async (dispatch) => {
  axios
    .get(`${API_URL}/workspaces`, authHeader())
    .then(({ data }) => {
      dispatch({ type: GET_WORKSPACES, payload: data });
      dispatch({ type: BOOKINGS_ERROR, payload: '' });
    })
    .catch(({ response }) => {
      dispatch({ type: WORKSPACES_ERROR, payload: response.data.message });
    });
};

// eslint-disable-next-line import/prefer-default-export
export { getWorkspaces };
