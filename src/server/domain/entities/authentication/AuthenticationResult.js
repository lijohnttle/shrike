class AuthenticationResult {
    constructor({ username, token, message }) {
        this.username = username;
        this.token = token;
        this.message = message;
    }
};


export {
    AuthenticationResult
}
