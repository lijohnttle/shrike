import AuthenticationResult from '../../entities/AuthenticationResult.js';
import { UserSession } from '../../entities/authentication/UserSession.js';
import { UserSessionStorage } from '../../entities/authentication/UserSessionStorage.js';
import { UserSessionCleaner } from '../../entities/authentication/UserSessionCleaner.js';
import { generateUuidv4 } from '../../../../utils/uuidGenerator.js';

const SESSION_LIFETIME = 24 * 60 * 60 * 1000;
const SESSION_CLEANUP_INTERVAL = 60 * 60 * 1000;

const sessionStorage = new UserSessionStorage();
const sessionCleaner = new UserSessionCleaner(sessionStorage, SESSION_LIFETIME, SESSION_CLEANUP_INTERVAL);

sessionCleaner.start();


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


/**
 * Opens a new session or renews an existing one.
 * @param {string} username Username.
 * @param {string} password Password.
 * @returns {AuthenticationResult}
 */
const signIn = (username, password) => {
    try {
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
    return sessionStorage.delete(token);
};

/**
 * Closes all existing sessions.
 */
const signOutEveryone = () => {
    sessionStorage.clear();
};

/**
 * Returns all user sessions.
 * @param {*} username Username.
 * @returns {Array<UserSession>} User sessions.
 */
const findSessions = (username) => {
    return sessionStorage.findByUsername(username);
};

/**
 * Returns a user session by token.
 * @param {string} token Access token.
 * @returns {UserSession}
 */
const findSession = (token) => {
    return sessionStorage.findByToken(token);
};

export {
    signIn,
    signOut,
    signOutEveryone,
    findSessions,
    findSession
};
