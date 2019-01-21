/* global console */

export default (function () {

    // if key "users" not exist in sessionStorage then parse default value '[]' empty array in json
    const users = JSON.parse(sessionStorage.getItem('users') || '[]');

    function authenticate({email, password}) {
        const violations = [];
        const user = users.find(user => email === user.email);

        if (undefined === user) {
            violations.push({property_path: 'email', message: 'user with email not found'});
        } else if (password !== user.password) {
            violations.push({property_path: 'password', message: 'invalid credentials'});
        }

        return violations;
    }

    function validate({email, password}) {
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const violations = [];

        if (!re.test(String(email).toLowerCase())) {
            violations.push({property_path: 'email', message: 'email invalid'});
        }

        if (undefined !== users.find(user => email === user.email)) {
            violations.push({property_path: 'email', message: 'email already registered'});
        }

        if (password.length < 6) {
            violations.push({property_path: 'password', message: 'password too weak, no less than six chars'});
        }

        return violations;
    }

    return {
        login: (user) => {
            return new Promise((resolve, reject) => {
                // -- if backend exist try fetch token from it --
                // -- or in case of fail you get violations --
                const violations = authenticate(user);
                violations.length ? reject(violations) : resolve({authenticated: true, user: user});
            });
        },

        register: (user) => {
            return new Promise((resolve, reject) => {
                // -- if backend exist try fetch token from it --
                // -- or in case of fail you get violations --
                const violations = validate(user);

                if (violations.length) {
                    reject(violations);
                } else {
                    users.push(user);
                    sessionStorage.setItem('users', JSON.stringify(users));
                    resolve({authenticated: true, user: user});
                }
            });
        },

        logout: (user) => {
            return new Promise((resolve, reject) => {
                // -- if backend exist try logout user from it --
                // -- or in case of fail you get violations --
                // -- assume that user successfully logout --
                const violations = [];
                violations.length ? reject(violations) : resolve(user);
            });
        }
    };
})();
