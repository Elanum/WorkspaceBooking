import { GET_USER, USER_ERROR } from '../actions/types';

const INITIAL_STATE = {
  user: undefined,
  errorMessage: '',
};

function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    case USER_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

export default users;
