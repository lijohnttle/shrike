class UserSession {
    /**
     * Represents a session of a user.
     * @param {string} username Username.
     * @param {string} token Access token.
     */
    constructor(username, token) {
        this.id = null;
        this.username = username;
        this.token = token;
        this.updatedOn = new Date();
        this.isExpired = false;
    }
};


export {
    UserSession
};
