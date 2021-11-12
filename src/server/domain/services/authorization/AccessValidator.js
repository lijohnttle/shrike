import { getUserAuthenticator } from '../../index.js';


class AccessValidator {
    verifyAdminAccess(token) {
        if (!this.validateAdminAccess(token)) {
            throw new Error('Authrorization error');
        }
    }

    validateAdminAccess(token) {
        return getUserAuthenticator().findSession(token);
    }
}


export {
    AccessValidator
};
