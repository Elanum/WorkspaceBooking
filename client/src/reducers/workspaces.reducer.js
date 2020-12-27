import { GET_WORKSPACES, WORKSPACES_ERROR } from '../actions/types';

const INITIAL_STATE = {
  workspaces: undefined,
  errorMessage: '',
};

function workspaces(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_WORKSPACES:
      return { ...state, workspaces: action.payload };
    case WORKSPACES_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

export default workspaces;
