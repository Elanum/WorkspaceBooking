import React, { Component } from 'react';
import {
  Card, Container, Col, Row,
} from 'react-bootstrap';
import WorkspacesService from '../services/workspaces.service';

class Workspaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: undefined,
      error: undefined,
    };
  }

  componentDidMount() {
    WorkspacesService.getAllWorkspaces()
      .then((response) => {
        this.setState({
          workspaces: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.response.data,
        });
      });
  }

  render() {
    const { workspaces, error } = this.state;

    if (error) return <Container>{error.message}</Container>;
    if (!workspaces) return <Container>Loading...</Container>;

    return (
      <Container>
        <h2>Workspaces</h2>
        <Row>
          {workspaces.map((workspace) => (
            <Col key={workspace._id} md="6" className="mb-3">
              <Card className="shadow">
                <Card.Header>{workspace.room.name}</Card.Header>
                <Card.Body>
                  <Card.Title>{workspace.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Workspaces;
