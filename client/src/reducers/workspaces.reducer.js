import { GET_WORKSPACES, WORKSPACES_ERROR, FILTER_WORKSPACES } from '../actions/types';

const INITIAL_STATE = {
  workspaces: undefined,
  errorMessage: '',
  filter: undefined,
};

function workspaces(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_WORKSPACES:
      return { ...state, workspaces: action.payload };
    case FILTER_WORKSPACES:
      return { ...state, filter: action.payload };
    case WORKSPACES_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

export default workspaces;
