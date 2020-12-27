import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth.reducer';
import users from './users.reducer';
import rooms from './rooms.reducer';
import workspaces from './workspaces.reducer';
import bookings from './bookings.reducer';

export default combineReducers({
  auth,
  users,
  rooms,
  workspaces,
  bookings,
  form: formReducer,
});
