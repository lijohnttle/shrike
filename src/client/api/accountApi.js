import { queryData } from "../services/api.js";

export const authenticate = async (username, password) => {
    const response = await queryData(`
        mutation {
            authenticate(credentials: {
                    username: "${username}",
                    password: "${password}"
                    }) {
                username
                authenticated
                token
                message
            }
        }
    `);

    return response.authenticate;
};