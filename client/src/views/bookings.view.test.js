import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Bookings from './bookings.view';

configure({ adapter: new Adapter(), disableLifecycleMethods: true });

let wrapper;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({ bookings: { bookings: [] } });

describe('Login View', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Bookings />
      </Provider>,
    );
  });

  it('should have Table', () => {
    expect(wrapper.find('table').exists()).toBeTruthy();
  });
});
