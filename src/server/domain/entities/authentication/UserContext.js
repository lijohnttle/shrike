import { UserRole } from './UserRole';


export class UserContext {
    /**
     * Represents a user context.
     * @param {Object} props 
     * @param {String} props.username Username
     * @param {UserRole[]} props.roles User
     */
    constructor(props) {
        /**
         * Username.
         * @type {String}
         * @public
         */
         this.username = props.username;

        /**
         * User roles.
         * @type {UserRole[]}
         * @public
         */
        this.roles = props.roles;
    }

    /**
     * Verifies admin role of a user. If fails, then it throws an exception. 
     */
    verifyAdminAccess() {
        if (!this.validateAdminAccess()) {
            throw new Error('Authrorization error');
        }
    }

    /**
     * Validates admin role of a user. If fails, then it returns false.
     * @returns {Boolean} 
     */
     validateAdminAccess() {
        return this.roles.some(role => role === UserRole.admin);
    }
}