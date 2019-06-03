import api from '@/service/api';
import config from '@/app.config';

const url = config.user_service_url;

export default  {
    login: user => api.post(`${url}/login`, user),
    register: user => api.post(`${url}/registration`, user),
    logout: () => api.post(`${url}/logout`),
    me: () => api.get(`${url}/me`),
};
