import AuthenticationResult from '../models/AuthenticationResult.js';
import { verifyCredentials, generateToken, persistSession, deleteSession } from '../persistence/authenticationRepository.js';

export const signIn = (username, password) => {
    try {
        verifyCredentials(username, password);

        const token = generateToken();
    
        persistSession(username, token);
    
        return new AuthenticationResult({
            username: username,
            token: token,
        });
    }
    catch (error) {
        return new AuthenticationResult({
            username: username,
            message: error.message,
        });
    }
};

export const signOut = (username, token) => {
    return deleteSession(username, token);
};