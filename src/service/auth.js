
export default {
    register: (user) => {
        return new Promise((resolve, reject) => {
            const violations = [];
            violations.push({property_path: 'email', message: `user already register with email: ${user.email}`});
            reject(violations);
        });
    }
};