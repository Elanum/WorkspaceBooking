import { shallow, configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import NotFound from '../views/notfound.view';

configure({ adapter: new Adapter() });

describe('Not Found View', () => {
  it('should have 404 header', () => {
    expect(shallow(<NotFound />).contains(<h1>404</h1>)).toBe(true);
  });

  it('should render not found text', () => {
    expect(render(<NotFound />).text()).toContain('Page Not Found!');
  });
});
