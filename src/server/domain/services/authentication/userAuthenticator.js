import AuthenticationResult from '../../entities/AuthenticationResult.js';
import { UserSession } from '../../entities/authentication/UserSession.js';
import { UserSessionStorage } from '../../entities/authentication/UserSessionStorage.js';
import { UserSessionCleaner } from '../../entities/authentication/UserSessionCleaner.js';
import { generateUuidv4 } from '../../../../utils/uuidGenerator.js';

const DEFAULT_SESSION_LIFETIME = 24 * 60 * 60 * 1000;    // 1 day
const DEFAULT_SESSION_CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour

/** @type {UserSessionStorage} */
let sessionStorage;
/** @type {UserSessionCleaner} */
let sessionCleaner;


const verifyConfiguration = () => {
    if (!sessionStorage) {
        throw new Error('Service has not been configured.');
    }
};

const verifyCredentials = (username, password) => {
    const expectedUserName = process.env.ADMIN_USERNAME;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedUserName || !expectedPassword) {
        throw new Error('Admin username or password have not been set up');
    }

    if (username !== expectedUserName || password !== expectedPassword) {
        throw new Error('Invalid credentials');
    }
};

const generateToken = () => {
    return generateUuidv4();
};


class Options {
    constructor() {
        this.sessionLifetime = null;
        this.sessionCleanUpInterval = null;
    }
};

/**
 * @param {Options} options Configuration options.
 */
const configure = (options) => {
    if (sessionStorage) {
        throw new Error('Service has already been configured.');
    }

    sessionStorage = new UserSessionStorage(options.sessionLifetime ?? DEFAULT_SESSION_LIFETIME);
    sessionCleaner = new UserSessionCleaner(sessionStorage, options.sessionCleanUpInterval ?? DEFAULT_SESSION_CLEANUP_INTERVAL);

    sessionCleaner.start();
};

/**
 * Opens a new session or renews an existing one.
 * @param {string} username Username.
 * @param {string} password Password.
 * @returns {AuthenticationResult}
 */
const signIn = (username, password) => {
    try {
        verifyConfiguration();
        verifyCredentials(username, password);

        const token = generateToken();

        const userSession = new UserSession(username, token);

        sessionStorage.store(userSession);
    
        return new AuthenticationResult({
            username: username,
            token: token,
        });
    }
    catch (error) {
        return new AuthenticationResult({
            username: username,
            message: error.message,
        });
    }
};

/**
 * Closes existing session.
 * @param {string} token Access token.
 * @returns {boolean}
 */
const signOut = (token) => {
    verifyConfiguration();

    return sessionStorage.delete(token);
};

/**
 * Closes all existing sessions.
 */
const signOutEveryone = () => {
    verifyConfiguration();

    sessionStorage.clear();
};

/**
 * Returns all user sessions.
 * @param {*} username Username.
 * @returns {Array<UserSession>} User sessions.
 */
const findSessions = (username) => {
    verifyConfiguration();

    return sessionStorage.findByUsername(username);
};

/**
 * Returns a user session by token.
 * @param {string} token Access token.
 * @returns {UserSession}
 */
const findSession = (token) => {
    verifyConfiguration();

    return sessionStorage.findByToken(token);
};

export {
    configure,
    Options,
    signIn,
    signOut,
    signOutEveryone,
    findSessions,
    findSession
};
