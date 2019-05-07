import api from '@/service/api';
import config from '@/app.config';

const url = config.user_service_url;

const validate = ({email}) => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const violations = [];

    if (!re.test(String(email).toLowerCase())) {
        violations.push({property_path: 'email', message: 'email invalid'});
    }

    return violations;
};

export default  {

    login: user => {
        return api.post(`${url}/login`, user);
    },

    register: user => {
        const violations = validate(user);

        if (violations.length) {
            return Promise.reject(violations);
        }
        return api.post(`${url}/registration`, user);
    },

    logout: token => {
        return api.post(`${url}/logout`, token);
    }
};
