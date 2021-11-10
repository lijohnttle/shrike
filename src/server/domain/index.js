import { UserAuthenticator, Options as UserAuthenticatorOptions } from './services/authentication/UserAuthenticator.js';
import { UserProfileCachedRepository, UserProfileRepository } from './services/users/UserProfileRepository.js';
import { UserVisitCounter, Options as UserVisitCounterOptions } from './services/diagnostics/UserVisitCounter.js';


/** @type {UserAuthenticator} */
let userAuthenticator;
/** @type {UserProfileCachedRepository} */
let userProfileRepository;
/** @type {UserVisitCounter} */
let userVisitCounter;

class Options {
    /**
     * @param {UserAuthenticatorOptions} userAuthenticatorOptions 
     * @param {UserVisitCounterOptions} userVisitCounterOptions
     */
    constructor(userAuthenticatorOptions, userVisitCounterOptions) {
        this.userAuthenticatorOptions = userAuthenticatorOptions;
        this.userVisitCounterOptions = userVisitCounterOptions;
    }
};

/**
 * @param {Options} options 
 */
const configure = (options) => {
    userAuthenticator = new UserAuthenticator(options.userAuthenticatorOptions)
    userProfileRepository = new UserProfileCachedRepository(new UserProfileRepository());
    userVisitCounter = new UserVisitCounter(options.userVisitCounterOptions);
};

const getUserAuthenticator = () => userAuthenticator;
const getUserProfileRepository = () => userProfileRepository;

export {
    Options,
    configure,
    getUserAuthenticator,
    getUserProfileRepository,
};
