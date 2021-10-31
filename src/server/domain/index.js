import {
    UserAuthenticator,
    Options as UserAuthenticatorOptions } from './services/authentication/UserAuthenticator.js';
import { UserProfileCachedRepository, UserProfileRepository } from './services/users/UserProfileRepository.js';


/** @type {UserAuthenticator} */
let userAuthenticator;
/** @type {UserProfileCachedRepository} */
let userProfileRepository;

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
    userProfileRepository = new UserProfileCachedRepository(new UserProfileRepository());
};

const getUserAuthenticator = () => userAuthenticator;
const getUserProfileRepository = () => userProfileRepository;

export {
    Options,
    configure,
    getUserAuthenticator,
    getUserProfileRepository,
};
