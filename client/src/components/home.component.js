import React, { Component } from 'react';
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
      <div>
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
      </div>
    );
  }
}

export default Home;
