import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import UserService from '../services/user.service';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: undefined,
    };
  }

  componentDidMount() {
    UserService.getAllUsers()
      .then((response) => {
        this.setState({
          content: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          content:
            (error.response && error.response.data)
            || error.message
            || error.toString(),
        });
      });
  }

  render() {
    const { content } = this.state;

    return (
      <Container style={{ paddingTop: '7em' }}>
        <h1>Users:</h1>
        {content && (
          <ul>
            {content.map((user) => (
              <div key={user.id}>
                <li>{user.username}</li>
                <ul>
                  <li>{user.email}</li>
                </ul>
              </div>
            ))}
          </ul>
        )}
      </Container>
    );
  }
}

export default withRouter(Home);
