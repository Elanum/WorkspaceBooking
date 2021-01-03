import React from 'react';
import Navigation from './navigation.component';

const App = ({ children }) => (
  <>
    <Navigation />
    <div className="pt-3 h-100">{children}</div>
  </>
);

export default App;
