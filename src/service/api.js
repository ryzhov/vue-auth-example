import axios from 'axios';
import auth from '@/store/auth';

const api = axios.create({
    timeout: 3000,
	withCredentials: true,
});

/**
 * Set Auth Token if Exists
 */
api.interceptors.request.use(
	config => {
		const {token} = auth.state;
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	error => Promise.reject(error)
);


export default api;
