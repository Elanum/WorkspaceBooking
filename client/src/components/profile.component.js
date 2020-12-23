import React, { Component } from 'react';
import UsersService from '../services/users.service';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    const user = localStorage.getItem('user');
    UsersService.getUser(user)
      .then((response) => {
        this.setState({
          user: response.data,
        });
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { user } = this.state;

    if (!user) return <div>Loading...</div>;

    return (
      <div>
        <h2>User:</h2>
        <div>{user.username}</div>
      </div>
    );
  }
}

export default Profile;
