export default function({username, authenticated, token, message}) {
    this.username = username;
    this.authenticated = authenticated;
    this.token = token;
    this.message = message;
};