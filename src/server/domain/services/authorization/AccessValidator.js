import { getUserAuthenticator } from '../../index.js';


class AccessValidator {
    verifyAdminAccess(token) {
        if (!this.validateAdminAccess(token)) {
            throw new Error('Authrorization error');
        }
    }

    validateAdminAccess(token) {
        try {
            return !!getUserAuthenticator().findSession(token);
        }
        catch (error) {
            console.error(error);

            return false;
        }
    }
}


export {
    AccessValidator
};
