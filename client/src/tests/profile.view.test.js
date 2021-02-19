import { configure, mount } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Profile from '../views/profile.view';
import exampleStore from './exampleStore.json';

configure({ adapter: new Adapter(), disableLifecycleMethods: true });

let wrapper;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(exampleStore);

describe('Profile View', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Profile match={{ params: { username: exampleStore.users.user.username } }} />
      </Provider>,
    );
  });

  it('should have a table of bookings', () => {
    expect(wrapper.find('table').exists()).toBeTruthy();
  });

  it('should show the user info', () => {
    expect(wrapper.contains(exampleStore.users.user.username)).toBeTruthy();
    expect(wrapper.contains(exampleStore.users.user.email)).toBeTruthy();
  });
});
