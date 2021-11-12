import { UserAuthenticator, Options as UserAuthenticatorOptions } from './services/authentication/UserAuthenticator.js';
import { UserProfileCachedRepository, UserProfileRepository } from './services/users/UserProfileRepository.js';
import { UserVisitCounter, Options as UserVisitCounterOptions } from './services/diagnostics/UserVisitCounter.js';
import { AccessValidator } from './services/authorization/AccessValidator.js';


/** @type {UserAuthenticator} */
let userAuthenticator;
/** @type {UserProfileCachedRepository} */
let userProfileRepository;
/** @type {UserVisitCounter} */
let userVisitCounter;
/** @type {AccessValidator} */
let accessValidator;

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
    accessValidator = new AccessValidator();

    userVisitCounter.scheduleAggregation();
};

const getUserAuthenticator = () => userAuthenticator;
const getUserProfileRepository = () => userProfileRepository;
const getUserVisitCounter = () => userVisitCounter;
const getAccessValidator = () => accessValidator;


export {
    Options,
    configure,
    getUserAuthenticator,
    getUserProfileRepository,
    getUserVisitCounter,
    getAccessValidator,
};
