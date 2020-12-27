import { GET_ROOMS, ROOMS_ERROR } from '../actions/types';

const INITIAL_STATE = {
  rooms: undefined,
  errorMessage: '',
};

function rooms(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ROOMS:
      return { ...state, rooms: action.payload };
    case ROOMS_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

export default rooms;
