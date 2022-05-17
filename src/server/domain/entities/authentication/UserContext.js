import { UserRole } from './UserRole';
import { AuthorizationError } from '../../../../contracts/errors';


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
     * @throws {Error}
     */
    verifyAdminAccess() {
        if (!this.validateAdminAccess()) {
            throw new AuthorizationError();
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