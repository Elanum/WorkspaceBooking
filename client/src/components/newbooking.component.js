import React, { Component } from 'react';
import {
  Alert, Button, Modal, Form,
} from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { BOOKINGS_ERROR } from '../actions/types';
import * as actions from '../actions';

const Switch = ({ input, id, disabled }) => (
  <Form.Switch
    id={id}
    onChange={input.onChange}
    label={id}
    disabled={disabled}
  />
);

class NewBooking extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.state = {
      showModal: false,
    };
  }

  onSubmit = (props) => {
    const {
      postBookings, workspace, getWorkspaces, filterWorkspaces, user, date, room,
    } = this.props;
    const data = {
      workspace: workspace._id,
      date: new Date(date),
    };
    if (props.pm) data.bookedPM = user._id;
    if (props.am) data.bookedAM = user._id;
    postBookings(data, () => {
      getWorkspaces(() => {
        const { workspaces } = this.props;
        filterWorkspaces(workspaces, room);
        this.close();
      });
    });
  };

  close = () => {
    const { dispatch } = this.props;
    dispatch({ type: BOOKINGS_ERROR, payload: '' });
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  render() {
    const {
      workspace, handleSubmit, errorMessage, date,
    } = this.props;
    const { showModal } = this.state;

    const currentWorkspace = workspace
      && workspace.bookings
      && workspace.bookings.find((b) => b.date === date);

    const bookedState = currentWorkspace && currentWorkspace.bookedState;

    return (
      <>
        <Button
          size="sm"
          variant={bookedState === 1 ? 'secondary' : 'primary'}
          onClick={this.open}
          disabled={bookedState === 1}
        >
          {bookedState === 1 ? 'Occupied' : 'Book'}
        </Button>
        <Modal show={showModal} onHide={this.close}>
          <Modal.Header closeButton>New Booking</Modal.Header>
          <Modal.Body>
            <div>
              <strong>Workspace: </strong>
              {workspace.name}
            </div>
            <div>
              <strong>Date: </strong>
              {new Date(date).toLocaleDateString()}
            </div>
            <br />
            <Form onSubmit={handleSubmit(this.onSubmit)}>
              <Form.Group>
                <Field
                  name="am"
                  component={Switch}
                  id="Morning"
                  disabled={bookedState === 0 || bookedState === 1}
                />
              </Form.Group>
              <Form.Group>
                <Field
                  name="pm"
                  component={Switch}
                  id="Afternoon"
                  disabled={bookedState === 1 || bookedState === 2}
                />
              </Form.Group>
              {errorMessage && (
                <Form.Group>
                  <Alert variant="danger">{errorMessage}</Alert>
                </Form.Group>
              )}
              <Form.Group>
                <Button size="sm" variant="success" type="submit">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.bookings.errorMessage,
    user: state.auth.authenticated,
    workspaces: state.workspaces.workspaces,
  };
}

const form = {
  form: 'newBooking',
  enableReinitialize: true,
};

export default compose(
  connect(mapStateToProps, actions),
  reduxForm(form),
)(NewBooking);
