import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Login from './login.view';

configure({ adapter: new Adapter(), disableLifecycleMethods: true });

let wrapper;
const mockStore = configureStore([]);
const store = mockStore({ auth: { errorMessage: '' } });

describe('Login View', () => {
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
