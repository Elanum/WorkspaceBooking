import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

class NotFound extends Component {
  render() {
    return (
      <Container className="h-100">
        <Row className="justify-content-center align-items-center text-center h-100">
          <Col>
            <h1>404</h1>
            <p>Page Not Found!</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NotFound;
