import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Bookings from '../views/bookings.view';
import exampleStore from './exampleStore.json';

configure({ adapter: new Adapter(), disableLifecycleMethods: true });

let wrapper;
let table;
let rows;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(exampleStore);

describe('Bookings View', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Bookings />
      </Provider>,
    );
    table = wrapper.find('table');
    rows = table.find('tr');
  });

  it('should have Table', () => {
    expect(table.exists()).toBeTruthy();
  });

  it('should contain two table rows', () => {
    expect(rows).toHaveLength(2);
  });

  it('should have a table entry in Test Room', () => {
    expect(rows.find('td')).toHaveLength(5);
    const cols = rows.find('td').map((col) => col.text());
    expect(cols[0]).toEqual(exampleStore.bookings.bookings[0].workspace.room.name);
  });
});
