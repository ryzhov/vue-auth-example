import Vue from 'vue';
import Logger from 'vuejs-logger';

const isProduction = process.env.NODE_ENV === 'production';

const options = {
    isEnabled: true,
    logLevel : isProduction ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : false,
    separator: ':',
    showConsoleColors: true
};

Vue.use(Logger, options);

export default Logger;
