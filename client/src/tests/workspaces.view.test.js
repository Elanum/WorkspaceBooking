import { configure, mount } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Workspaces from '../views/workspaces.view';
import exampleStore from './exampleStore.json';

configure({ adapter: new Adapter(), disableLifecycleMethods: true });

let wrapper;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(exampleStore);

describe('Workspaces View', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Workspaces />
      </Provider>,
    );
  });

  it('should not have table', () => {
    expect(wrapper.find('table').exists()).toBeFalsy();
  });
});
