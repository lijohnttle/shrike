import {
    configure as configureUserAuthenticator,
    Options as UserAuthenticatorOptions } from './services/authentication/userAuthenticator.js';


class Options {
    /**
     * @param {UserAuthenticatorOptions} userAuthenticatorOptions 
     */
    constructor(userAuthenticatorOptions) {
        this.userAuthenticatorOptions = userAuthenticatorOptions;
    }
};

/**
 * @param {Options} options 
 */
const configure = (options) => {
    configureUserAuthenticator(options.userAuthenticatorOptions);
};

export {
    configure,
    Options
};
