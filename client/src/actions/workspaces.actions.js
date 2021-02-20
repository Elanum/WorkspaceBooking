import axios from 'axios';
import {
  BOOKINGS_ERROR,
  FILTER_WORKSPACES,
  GET_WORKSPACES,
  WORKSPACES_ERROR,
} from './types';
import { authHeader, API_URL } from '../config/api.config';

const getWorkspaces = (callback) => async (dispatch) => {
  axios
    .get(`${API_URL}/workspaces`, authHeader())
    .then(({ data }) => {
      dispatch({ type: GET_WORKSPACES, payload: data });
      dispatch({ type: BOOKINGS_ERROR, payload: '' });
      callback();
    })
    .catch(({ response }) => {
      if (response) {
        dispatch({ type: WORKSPACES_ERROR, payload: response.data.message });
      } else {
        dispatch({ type: WORKSPACES_ERROR, payload: 'Network Error' });
      }
    });
};

const filterWorkspaces = (workspaces, room) => async (dispatch) => {
  const filteredWorkspaces = room === 'All Rooms'
    ? workspaces
    : workspaces.filter((workspace) => workspace.room.name === room);
  dispatch({
    type: FILTER_WORKSPACES,
    payload: { workspaces: filteredWorkspaces },
  });
};

export { getWorkspaces, filterWorkspaces };
