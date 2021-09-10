export default function UserSession(username, token) {
    this.username = username;
    this.token = token;
    this.updatedOn = new Date();
}