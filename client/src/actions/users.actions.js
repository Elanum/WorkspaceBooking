import axios from 'axios';
import { GET_USER, USER_ERROR } from './types';
import { authHeader, API_URL } from '../config/api.config';

const getUser = (props) => async (dispatch) => {
  axios
    .get(`${API_URL}/users/${props.username}`, authHeader())
    .then(({ data }) => {
      dispatch({ type: GET_USER, payload: data });
      dispatch({ type: USER_ERROR, payload: '' });
    })
    .catch(({ response }) => {
      dispatch({ type: USER_ERROR, payload: response.data.message });
    });
};

// eslint-disable-next-line import/prefer-default-export
export { getUser };
