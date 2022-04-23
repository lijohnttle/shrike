/**
 * The model of an active user session.
 */
export class UserSessionModel {
    /**
     * @param {String} username Username of the active session.
     * @param {String} token Token of the active session.
     */
    constructor(username, token) {
        /**
         * @type {String}
         * @public
         */
        this.username = username;
        /**
         * @type {String}
         * @public
         */
        this.token = token;
    }
}