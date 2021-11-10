import { AuthenticationResult } from '../../entities/authentication/AuthenticationResult.js';
import { UserSession } from '../../entities/authentication/UserSession.js';
import { UserSessionStorage } from '../../entities/authentication/UserSessionStorage.js';
import { UserSessionCleaner } from '../../entities/authentication/UserSessionCleaner.js';
import { generateUuidv4 } from '../../../../utils/uuidGenerator.js';


const DEFAULT_SESSION_LIFETIME = 24 * 60 * 60 * 1000;    // 1 day
const DEFAULT_SESSION_CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour


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
}

class UserAuthenticator {
    /**
     * @param {Options} options Configuration options.
     */
    constructor(options) {
        /** @type {UserSessionStorage} */
        this.sessionStorage = new UserSessionStorage(options.sessionLifetime ?? DEFAULT_SESSION_LIFETIME);;
        /** @type {UserSessionCleaner} */
        this.sessionCleaner = new UserSessionCleaner(this.sessionStorage, options.sessionCleanUpInterval ?? DEFAULT_SESSION_CLEANUP_INTERVAL);

        this.sessionCleaner.start();
    }

    /**
     * Opens a new session or renews an existing one.
     * @param {string} username Username.
     * @param {string} password Password.
     * @returns {AuthenticationResult}
     */
    signIn(username, password) {
        try {
            verifyCredentials(username, password);

            const token = generateToken();

            const userSession = new UserSession(username, token);

            this.sessionStorage.store(userSession);
        
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
    signOut(token) {
        return this.sessionStorage.delete(token);
    };

    /**
     * Closes all existing sessions.
     */
    signOutEveryone() {
        this.sessionStorage.clear();
    };

    /**
     * Returns all user sessions.
     * @param {*} username Username.
     * @returns {Array<UserSession>} User sessions.
     */
    findSessions(username) {
        return this.sessionStorage.findByUsername(username);
    };
    
    /**
     * Returns a user session by token.
     * @param {string} token Access token.
     * @returns {UserSession}
     */
    findSession(token) {
        return this.sessionStorage.findByToken(token);
    };
}


export {
    Options,
    UserAuthenticator,
};
