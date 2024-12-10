import api from './index';

class ApiService {
    async signup(payload) {
        const response = await api.post('/signup', payload);
        return response.data;
    }
    async signin(payload) {
        const response = await api.post('/login', payload);
        return response.data;
    }
    async createPost(payload){
        const response = await api.post('/blogs', payload);
        return response.data;
    }
    async getPosts(){
        const response = await api.get('/blogs');
        return response.data;
    }
}
export default ApiService;