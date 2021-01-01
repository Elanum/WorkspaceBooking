import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Card, Container, Col, Row,
} from 'react-bootstrap';
import * as actions from '../actions';
import NewBooking from '../components/newbooking.component';

class Workspaces extends Component {
  componentDidMount() {
    const { getAllWorkspaces } = this.props;
    getAllWorkspaces();
  }

  render() {
    const { workspaces, errorMessage } = this.props;

    if (errorMessage) return <Container>{errorMessage}</Container>;
    if (!workspaces) return <Container>Loading...</Container>;

    return (
      <Container>
        <h2>Workspaces</h2>
        <Row>
          {workspaces.map((workspace) => (
            <Col key={workspace._id} md="4" className="mb-3">
              <Card className="shadow">
                <Card.Header>{workspace.room.name}</Card.Header>
                <Card.Body>
                  <Card.Title>{workspace.name}</Card.Title>
                </Card.Body>
                <Card.Footer>
                  <NewBooking workspace={workspace} />
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { workspaces: state.workspaces.workspaces, errorMessage: state.workspaces.errorMessage };
}

export default compose(connect(mapStateToProps, actions))(Workspaces);
