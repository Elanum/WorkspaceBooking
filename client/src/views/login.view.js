import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Form,
  FormControl,
  Button,
  Alert,
  Row,
  Col,
  Container,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../actions';

const Input = ({ input, type, placeholder }) => (
  <FormControl
    type={type}
    placeholder={placeholder}
    value={input.value}
    onChange={input.onChange}
  />
);

class Login extends Component {
  onSubmit = (props) => {
    const { login, history } = this.props;
    login(props, () => {
      history.push(`/profile/${props.username}`);
    });
  };

  render() {
    const { handleSubmit, errorMessage } = this.props;

    return (
      <Container className="h-100" style={{ paddingBottom: '56px' }}>
        <Row className="justify-content-center align-items-center text-center h-100">
          <Col md="4">
            <h1>
              <FontAwesomeIcon icon={faBriefcase} />
            </h1>
            <br />
            <Form onSubmit={handleSubmit(this.onSubmit)}>
              <Form.Group>
                <Field
                  name="username"
                  type="text"
                  component={Input}
                  placeholder="Username"
                />
              </Form.Group>
              <Form.Group>
                <Field
                  name="password"
                  type="password"
                  component={Input}
                  placeholder="Password"
                />
              </Form.Group>
              {errorMessage && (
                <Form.Group>
                  <Alert variant="danger">{errorMessage}</Alert>
                </Form.Group>
              )}
              <Form.Group>
                <Button type="submit" block>
                  Login
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'login' }),
)(Login);
