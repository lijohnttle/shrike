import {
    UserAuthenticator,
    Options as UserAuthenticatorOptions } from './services/authentication/UserAuthenticator.js';


/** @type {UserAuthenticator} */
let userAuthenticator;

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
    userAuthenticator = new UserAuthenticator(options.userAuthenticatorOptions)
};

const getUserAuthenticator = () => userAuthenticator;

export {
    Options,
    configure,
    getUserAuthenticator,
};
