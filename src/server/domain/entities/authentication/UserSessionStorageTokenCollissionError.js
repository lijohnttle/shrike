class UserSessionStorageTokenCollissionError extends Error {
    /**
     * 
     * @param {string} errorCode Error code.
     */
    constructor() {
        super('Another user session with the same token already exists');

        this.name = 'UserSessionStorageTokenCollissionError';
    }
}


export {
    UserSessionStorageTokenCollissionError
};
