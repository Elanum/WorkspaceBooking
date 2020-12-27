import React, { Component } from 'react';
import {
  Alert, Button, Modal, Form,
} from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../actions';

const Input = ({ input, type, placeholder }) => (
  <Form.Control
    type={type}
    placeholder={placeholder}
    value={input.value}
    onChange={input.onChange}
  />
);

const Switch = ({ input, id }) => (
  <Form.Switch id={id} onChange={input.onChange} label={id} />
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
    const { newBooking, workspace } = this.props;
    let time;
    if (props.am && props.pm) time = 'day';
    else if (props.am) time = 'am';
    else if (props.pm) time = 'pm';
    const data = {
      workspace: workspace._id,
      user: user._id,
      date: new Date(props.date).toISOString(),
      time,
    };
    newBooking(data, () => {
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
    const { workspace, handleSubmit, errorMessage } = this.props;
    const { showModal } = this.state;

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
                <Field name="date" type="date" component={Input} />
              </Form.Group>
              <Form.Group>
                <Field name="am" component={Switch} id="Morning" />
              </Form.Group>
              <Form.Group>
                <Field name="pm" component={Switch} id="Afternoon" />
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
  return { errorMessage: state.bookings.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'newBooking' }),
)(NewBooking);
