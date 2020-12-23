import React from 'react';
import { Container } from 'react-bootstrap';
import Navigation from './navigation.component';

const App = ({ children }) => (
  <div>
    <Navigation />
    <Container>{children}</Container>
  </div>
);

export default App;
