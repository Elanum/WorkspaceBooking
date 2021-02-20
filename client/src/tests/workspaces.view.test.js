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
let input;
let select;
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
    input = wrapper.find('input');
    select = wrapper.find('select');
  });

  it('should have date filter input', () => {
    expect(input.length).toEqual(1);

    const props = input.map((i) => i.props())[0];
    expect(props.type).toEqual('date');
  });

  it('should have a room selector', () => {
    expect(select.length).toEqual(1);
    const options = select.find('option').map((o) => o.text());
    expect(options[0]).toEqual('All Rooms');
  });

  it('should show the workspace', () => {
    expect(wrapper.contains(exampleStore.workspaces.workspaces[0].name)).toBeTruthy();
  });
});
