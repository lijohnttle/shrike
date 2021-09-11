export default class UserSession {
    constructor(username, token) {
        this.username = username;
        this.token = token;
        this.updatedOn = new Date();
    }
};