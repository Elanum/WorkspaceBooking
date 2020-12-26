import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `http://localhost:${process.env.SERVER_PORT || 5000}/api/workspaces`;

class WorkspacesService {
  getAllWorkspaces = () => axios.get(`${API_URL}`, { headers: authHeader() });
}

export default new WorkspacesService();
