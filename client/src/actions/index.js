import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

const API_URL = `http://localhost:${process.env.SERVER_PORT || 5000}/api`;

const login = (props, callback) => async (dispatch) => {
  axios
    .post(`${API_URL}/login`, props)
    .then((response) => {
      dispatch({ type: AUTH_USER, payload: response.data });
      dispatch({ type: AUTH_ERROR, payload: '' });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.username);
      callback();
    })
    .catch((error) => {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
    });
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return { type: AUTH_USER, payload: '' };
};

export { login, logout };
