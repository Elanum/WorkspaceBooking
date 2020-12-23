import React from 'react';
import Navigation from './navigation.component';

const App = ({ children }) => (
  <div>
    <Navigation />
    <div>{children}</div>
  </div>
);

export default App;
