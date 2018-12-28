
export default {
    register: (/*user*/) => {
        return new Promise((resolve, reject) => {
            const violations = [];
            violations.push({property_path: 'email', message: 'email already registered'});
            violations.push({property_path: 'password', message: 'password too weak'});
            reject(violations);
        });
    }
};