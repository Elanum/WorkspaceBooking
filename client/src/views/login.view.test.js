/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Login from './login.view';

configure({ adapter: new Adapter(), disableLifecycleMethods: true });

let wrapper;
const mockStore = configureStore([]);
const store = mockStore({ auth: { errorMessage: '' } });

describe('Login', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Login />
      </Provider>,
    );
  });

  it('should have form', () => {
    expect(wrapper.find('form').exists()).toBeTruthy();
  });
});
