/* eslint-disable arrow-body-style */
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_MESSAGE,
} from './types';

import AuthService from '../services/auth.service';

const register = (username, email, password) => async (dispatch) => {
  return AuthService.register(username, email, password)
    .then((response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.username,
      });

      return Promise.resolve();
    })
    .catch((error) => {
      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload:
          (error.response && error.response.data && error.response.message)
          || error.message
          || error.toString(),
      });

      return Promise.reject();
    });
};

const login = (username, password) => async (dispatch) => {
  return AuthService.login(username, password)
    .then((response) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: response },
      });

      return Promise.resolve();
    })
    .catch((error) => {
      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload:
          (error.response && error.response.data && error.response.message)
          || error.message
          || error.toString(),
      });

      return Promise.reject();
    });
};

const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export { register, login, logout };
