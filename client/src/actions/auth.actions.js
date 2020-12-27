import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';
import { API_URL } from '../config/api.config';

const login = (props, callback) => async (dispatch) => {
  axios
    .post(`${API_URL}/login`, props)
    .then(({ data }) => {
      dispatch({ type: AUTH_USER, payload: data });
      dispatch({ type: AUTH_ERROR, payload: '' });
      localStorage.setItem('user', JSON.stringify(data));
      callback();
    })
    .catch(({ response }) => {
      dispatch({ type: AUTH_ERROR, payload: response.data.message });
    });
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return { type: AUTH_USER, payload: '' };
};

export { login, logout };
