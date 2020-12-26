import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `http://localhost:${process.env.SERVER_PORT || 5000}/api/rooms`;

class RoomsService {
  getAllRooms = () => axios.get(`${API_URL}`, { headers: authHeader() });
}

export default new RoomsService();
