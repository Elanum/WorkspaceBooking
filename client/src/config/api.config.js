const { NODE_ENV } = process.env;
const API_URL = NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';

const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const header = user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
  return { headers: header };
};

export { authHeader, API_URL };
