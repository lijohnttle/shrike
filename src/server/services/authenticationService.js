import AuthenticationResult from '../models/AuthenticationResult.js';

export const authenticate = (username, password) => {
    return new AuthenticationResult({
        username: username,
        authenticated: true,
        token: "token",
        message: "message",
    });
};