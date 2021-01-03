import { GET_BOOKINGS, POST_BOOKINGS, BOOKINGS_ERROR } from '../actions/types';

const INITIAL_STATE = {
  bookings: undefined,
  errorMessage: '',
};

function bookings(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_BOOKINGS:
      return { ...state, bookings: action.payload };
    case POST_BOOKINGS: {
      return { ...state, bookings: [action.payload] };
    }
    case BOOKINGS_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

export default bookings;
