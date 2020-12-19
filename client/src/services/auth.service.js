/* eslint-disable class-methods-use-this */
import axios from 'axios';

const API_URL = `http://localhost:${process.env.SERVER_PORT || 5000}/api/`;

class AuthService {
  async login(username, password) {
    const response = await axios.post(`${API_URL}login`, {
      username,
      password,
    });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username, email, password) {
    return axios.post(`${API_URL}register`, { username, email, password });
  }
}

export default new AuthService();
