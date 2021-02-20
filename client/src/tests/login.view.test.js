import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Login from '../views/login.view';
import exampleStore from './exampleStore.json';

configure({ adapter: new Adapter(), disableLifecycleMethods: true });

let wrapper;
let form;
const mockStore = configureStore([]);
const store = mockStore(exampleStore);

describe('Login View', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Login />
      </Provider>,
    );
    form = wrapper.find('form');
  });

  it('should have form', () => {
    expect(form.exists()).toBeTruthy();
  });

  it('should have a user inputs', () => {
    const inputs = form.find('input').map((i) => i.props());
    const button = form.find('button');

    expect(inputs[0].type).toEqual('text');
    expect(inputs[0].placeholder).toEqual('Username');

    expect(inputs[1].type).toEqual('password');
    expect(inputs[1].placeholder).toEqual('Password');

    expect(button.text()).toEqual('Login');
  });
});
