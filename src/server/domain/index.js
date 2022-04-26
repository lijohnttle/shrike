import { UserAuthenticator, Options as UserAuthenticatorOptions } from './services/authentication/UserAuthenticator.js';
import { UserProfileCachedRepository, UserProfileRepository } from './services/users/UserProfileRepository.js';
import { UserVisitCounter, Options as UserVisitCounterOptions } from './services/diagnostics/UserVisitCounter.js';
import { AccessValidator } from './services/authorization/AccessValidator.js';
import { BlogManager } from './services/blog/BlogManager';


/** @type {UserAuthenticator} */
let userAuthenticator;
/** @type {UserProfileCachedRepository} */
let userProfileRepository;
/** @type {UserVisitCounter} */
let userVisitCounter;
/** @type {AccessValidator} */
let accessValidator;
/** @type {BlogManager} */
let blogManager;

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
    blogManager = new BlogManager();

    userVisitCounter.scheduleAggregation();
};

const getUserAuthenticator = () => userAuthenticator;
const getUserProfileRepository = () => userProfileRepository;
const getUserVisitCounter = () => userVisitCounter;
const getAccessValidator = () => accessValidator;
const getBlogManager = () => blogManager;


export {
    Options,
    configure,
    getUserAuthenticator,
    getUserProfileRepository,
    getUserVisitCounter,
    getAccessValidator,
    getBlogManager,
};
