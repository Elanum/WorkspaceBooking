import React, { Component } from 'react';
import {
  Alert, Button, Modal, Form,
} from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import * as actions from '../actions';

const today = new Date().toISOString().slice(0, 10);

const Input = ({
  input, type, placeholder, min,
}) => (
  <Form.Control
    type={type}
    placeholder={placeholder}
    value={input.value}
    onChange={input.onChange}
    min={min}
  />
);

const Switch = ({ input, id, disabled }) => (
  <Form.Switch
    id={id}
    onChange={input.onChange}
    label={id}
    disabled={disabled}
  />
);

const user = JSON.parse(localStorage.getItem('user'));

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
    const { postBookings, workspace, getWorkspaces } = this.props;
    const data = {
      workspace: workspace._id,
      date: new Date(props.date),
    };
    if (props.pm) data.bookedPM = user._id;
    if (props.am) data.bookedAM = user._id;
    postBookings(data, () => {
      getWorkspaces();
      this.close();
    });
  };

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  render() {
    const {
      workspace, handleSubmit, errorMessage, formDate,
    } = this.props;
    const { showModal } = this.state;

    const currentWorkspace = workspace
      && workspace.bookings
      && workspace.bookings.find((b) => b.date === formDate);

    const bookedState = currentWorkspace && currentWorkspace.bookedState;

    return (
      <>
        <Button size="sm" variant="outline-primary" onClick={this.open}>
          Book
        </Button>
        <Modal show={showModal} onHide={this.close}>
          <Modal.Header closeButton>New Booking</Modal.Header>
          <Modal.Body>
            {workspace.name}
            <Form onSubmit={handleSubmit(this.onSubmit)}>
              <Form.Group>
                <Field
                  name="date"
                  type="date"
                  component={Input}
                  value={today}
                  min={today}
                />
              </Form.Group>
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
  const selector = formValueSelector('newBooking');
  const formDate = selector(state, 'date');
  return { errorMessage: state.bookings.errorMessage, formDate };
}

const form = {
  form: 'newBooking',
  initialValues: {
    date: today,
  },
};

export default compose(
  connect(mapStateToProps, actions),
  reduxForm(form),
)(NewBooking);
