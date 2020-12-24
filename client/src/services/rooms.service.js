import axios from 'axios';

const API_URL = `http://localhost:${process.env.SERVER_PORT || 5000}/api/rooms`;

class RoomsService {
  getAllRooms = () => axios.get(`${API_URL}`);
}

export default new RoomsService();
