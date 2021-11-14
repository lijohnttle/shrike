import { UserSessionStorage, EventNames } from './UserSessionStorage.js';


class UserSessionCleaner {
    /**
     * 
     * @param {UserSessionStorage} sessionStorage User session storage.
     * @param {number} cleanUpInterval Session clean-up interval.
     */
    constructor(sessionStorage, cleanUpInterval) {
        if (!sessionStorage) {
            throw new Error('Parameter \'sessionStorage\' is not specified.');
        }
        if (!cleanUpInterval) {
            throw new Error('Parameter \'cleanUpInterval\' is not specified.');
        }

        this._sessionStorage = sessionStorage;
        this._cleanUpInterval = cleanUpInterval;
        this._timer = null;
        this._isStarted = false;
    }

    /**
     * Starts the work of the cleaner.
     */
    start() {
        this._isStarted = true;

        this._refreshTimer();

        this._sessionStorage.addListener(EventNames.SESSION_ADDED, this._sessionsChanged.bind(this));
        this._sessionStorage.addListener(EventNames.SESSION_DELETED, this._sessionsChanged.bind(this));
    }

    /**
     * Stops the work of the cleaner.
     */
    stop() {
        this._isStarted = false;
        
        this._sessionStorage.removeListener(EventNames.SESSION_ADDED, this._sessionsChanged);
        this._sessionStorage.removeListener(EventNames.SESSION_DELETED, this._sessionsChanged);
    }

    /**
     * Starts or stops timer if there are sessions in a storage.
     */
    _refreshTimer() {
        if (this._isStarted) {
            if (this._sessionStorage.hasSessions()) {
                if (!this._timer) {
                    this._timer = setInterval(this._cleanUp.bind(this), this._cleanUpInterval);
                    this._timer.unref();
                }
            }
            else {
                if (this._timer) {
                    clearInterval(this._timer);
    
                    this._timer = null;
                }
            }
        }
    };

    _sessionsChanged() {
        this._refreshTimer();
    }

    _cleanUp() {
        console.log('Clean up expired sessions...');
        this._sessionStorage.deleteExpired();
        console.log('Expired sessions have been clean up');
    }
};


export {
    UserSessionCleaner
};
