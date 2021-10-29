import AuthenticationResult from '../entities/AuthenticationResult.js';
import UserSession from '../entities/UserSession.js';
import { generateUuidv4 } from '../../../utils/uuidGenerator.js';

const SESSIN_DURATION_MIN = 60 * 24;
const sessions = { };

const ensureSessionBucket = (username) => {
    let sessionBucket = sessions[username];

    if (!sessionBucket) {
        sessionBucket = [];
        sessions[username] = sessionBucket;
    }

    return sessionBucket;
};

const cleanUpSessionBucket = (username) => {
    const sessionBucket = sessions[username];
    let expiredSessionsCount = 0;

    for (let i = sessionBucket.length - 1; i >= 0; i--) {
        const session = sessionBucket[i];

        const today = new Date();
        const diffMs = (session.updatedOn - today);
        const diffMin = Math.floor(diffMs / 1000 / 60);

        if (diffMin >= SESSIN_DURATION_MIN) {
            sessionBucket.pop();
            expiredSessionsCount++;
        }
    }

    if (sessionBucket.length == 0) {
        delete sessions[username];
    }

    return expiredSessionsCount;
};

const cleanUpSessions = () => {
    console.log(`Cleaning up expired user sessions...`);

    let expiredSessionsCount = 0;

    for (let username in sessions) {
        expiredSessionsCount += cleanUpSessionBucket(username);
    }

    if (expiredSessionsCount > 0) {
        console.log(`Removed ${expiredSessionsCount} expired user sessions`);
    }
    else {
        console.log(`No expired user sessions found`);
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

const persistSession = (username, token) => {
    console.log(`Preparing to persist user session...`);

    cleanUpSessions();

    const sessionBucket = ensureSessionBucket(username);
    let session = null;

    for (let i = 0; i < sessionBucket.length; i++) {
        const existingSession = sessionBucket[i];

        if (existingSession.token === token) {
            existingSession.updatedOn = new Date();
            session = existingSession;
            break;
        }
    }

    if (!session) {
        session = new UserSession(username, token);

        sessionBucket.push(session);

        console.log(`New user session has been created`);
    }
    else {
        console.log(`Exising user session has been prolonged`);
    }
};

const deleteSession = (username, token) => {
    console.log(`Preparing to delete session...`);

    cleanUpSessions();

    let sessionBucket = sessions[username];
    let session = null;

    if (sessionBucket) {
        for (let i = 0; i < sessionBucket.length; i++) {
            const existingSession = sessionBucket[i];

            if (existingSession.token === token) {
                sessionBucket = sessionBucket.splice(i, 1);

                if (sessionBucket.length == 0) {
                    delete sessions[username];
                }
                else {
                    sessions[username] = sessionBucket;
                }
                
                session = existingSession;
                break;
            }
        }
    }

    if (session) {
        console.log(`Session has been deleted`);
    }
    else {
        console.log('Session has not been found');
    }

    return !!session;
};


const openSession = (username, password) => {
    try {
        verifyCredentials(username, password);

        const token = generateToken();
    
        persistSession(username, token);
    
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

const closeSessioon = (username, token) => {
    return deleteSession(username, token);
};

const verifyToken = (token) => {
    for (const username in sessions) {
        const userSessions = sessions[username];

        for (const session of userSessions) {
            if (session.token === token) {
                return true;
            }
        }
    }

    return false;
}

export {
    openSession,
    closeSessioon,
    sessions,
    verifyToken
};
