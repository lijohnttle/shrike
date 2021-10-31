import { UserSession } from './UserSession.js';
import { UserSessionStorageTokenCollissionError } from './UserSessionStorageTokenCollissionError.js';

/**
 * Throws UserSessionStorageTokenCollissionError error if there is another session of another user with the same token.
 * @param {UserSessionStorage} storage 
 * @param {UserSession} session 
 */
const verifyTokenCollission = (storage, session) => {
    const foundSession = storage._sessionByToken[session.token];

    if (foundSession && foundSession.username !== session.username) {
        throw new UserSessionStorageTokenCollissionError();
    }
};

const EventNames = {
    SESSION_ADDED: 'SESSION_ADDED',
    SESSION_DELETED: 'SESSION_DELETED',
};

class UserSessionStorage {
    /**
     * @param {number} sessionLifetime Session lifetime in milliseconds.
     */
    constructor(sessionLifetime) {
        this._sessionLifetime = sessionLifetime || 60 * 60 * 1000;
        this._sessionsByUsername = { }; // the key is a username, the value is an array of UserSession objects
        this._sessionByToken = { }; // the key is token
        this._eventListeners = { };
        
        for (const eventName in EventNames) {
            this._eventListeners[eventName] = [];
        }
    }

    /**
     * Persists a user session.
     * @param {UserSession} session User session to store.
     */
    store(session) {
        verifyTokenCollission(this, session);

        this._sessionByToken[session.token] = session;

        let sessionBucket = this._sessionsByUsername[session.username];
        let sessionAdded = false;

        if (sessionBucket) {
            let needToInsertSession = true;

            for (let i = sessionBucket.length - 1; i >= 0; i--) {
                const existingSession = sessionBucket[i];

                if (existingSession.token === session.token) {
                    sessionBucket[i] = session;
                    needToInsertSession = false;
                    break;
                }
            }

            if (needToInsertSession) {
                sessionBucket.push(session);

                sessionAdded = true;
            }
        }
        else {
            this._sessionsByUsername[session.username] = [session];

            sessionAdded = true;
        }

        if (sessionAdded) {
            this._callEvent(EventNames.SESSION_ADDED);
        }
    }

    /**
     * Deletes all sessions.
     */
    clear() {
        const thereAreSessions = this.hasSessions;

        this._sessionByToken = { };
        this._sessionsByUsername = { };

        if (thereAreSessions) {
            this._callEvent(EventNames.SESSION_DELETED);
        }
    }

    /**
     * Deletes a session by token.
     * @param {string} token Access token.
     */
    delete(token) {
        const session = this._sessionByToken[token];
        let sessionDeleted = !!session;

        if (session) {
            delete this._sessionByToken[token];

            let sessionBucket = this._sessionsByUsername[session.username];

            for (let i = sessionBucket.length - 1; i >= 0; i--) {
                const existingSession = sessionBucket[i];

                if (existingSession.token === session.token) {
                    sessionBucket.splice(i, 1);

                    if (sessionBucket.length == 0) {
                        delete this._sessionsByUsername[session.username];
                    }
                    else {
                        this._sessionsByUsername[session.username] = sessionBucket;
                    }

                    break;
                }
            }
        }

        if (sessionDeleted) {
            this._callEvent(EventNames.SESSION_DELETED);
        }

        return sessionDeleted;
    }

    /**
     * Deletes all expired sessions.
     */
    deleteExpired() {
        let sessionDeleted = false;

        const eventListeners = this._eventListeners[EventNames.SESSION_DELETED];
        this._eventListeners[EventNames.SESSION_DELETED] = [];

        try {
            for (const token in this._sessionByToken) {
                const session = this._sessionByToken[token];
    
                if (this.isExpired(session)) {
                    this.delete(token);
    
                    sessionDeleted = true;
                }
            }
        }
        finally {
            this._eventListeners[EventNames.SESSION_DELETED] = eventListeners;
        }

        if (sessionDeleted) {
            this._callEvent(EventNames.SESSION_DELETED);
        }
    }

    /**
     * Returns an array of sessions for specific user.
     * @param {string} username Username
     * @returns {Array<UserSession>} Array of user sessions.
     */
    findByUsername(username) {
        const userSessions = this._sessionsByUsername[username] || [];

        for (const session of userSessions) {
            session.isExpired = this.isExpired(session);
        }

        return userSessions;
    }

    /**
     * Returns a session for specific user using access token.
     * @param {string} token Access token.
     * @returns {UserSession} Uesr session.
     */
    findByToken(token) {
        const session = this._sessionByToken[token];

        if (session) {
            session.isExpired = this.isExpired(session);
        }

        return session;
    }

    /**
     * Returns true if there are open sessions.
     * @returns {boolean}
     */
    hasSessions() {
        return Object.keys(this._sessionByToken).length > 0;
    }

    /**
     * Returns true if session is expired.
     * @param {UserSession} session User session.
     * @returns {boolean}
     */
    isExpired(session) {
        return (new Date() - session.updatedOn) >= this._sessionLifetime;
    }


    /**
     * Adds event listener.
     * @param {*} eventName Event name.
     * @param {*} handler Event handler.
     */
    addListener(eventName, handler) {
        if (Object.keys(this._eventListeners).includes(eventName)) {
            const handlerIndex = this._eventListeners[eventName].indexOf(handler);

            if (handlerIndex < 0) {
                this._eventListeners[eventName].push(handler);
            }
        }
        else {
            throw new Error('Invalid event name');
        }
    }

    /**
     * Removes event listener.
     * @param {*} eventName Event name.
     * @param {*} handler Event handler.
     */
    removeListener(eventName, handler) {
        if (Object.keys(this._eventListeners).includes(eventName)) {
            const handlerIndex = this._eventListeners[eventName].indexOf(handler);

            if (handlerIndex >= 0) {
                this._eventListeners[eventName].splice(handlerIndex, 1);
            }
        }
        else {
            throw new Error('Invalid event name');
        }
    }

    /**
     * Calls event.
     * @param {string} eventName Event name.
     */
    _callEvent(eventName) {
        if (Object.keys(this._eventListeners).includes(eventName)) {
            const handlers = this._eventListeners[eventName];

            for (const handler of handlers) {
                handler();
            }
        }
        else {
            throw new Error('Invalid event name');
        }
    }
}

export {
    UserSessionStorage,
    EventNames,
};
