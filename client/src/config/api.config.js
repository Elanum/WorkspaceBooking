const API_URL = process.env.NODE_ENV === 'production' ? '/api' : `http://localhost:${process.env.SERVER_PORT || 5000}/api`;

const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const header = user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
  return { headers: header };
};

export { authHeader, API_URL };
