import { queryData } from "../services/api.js";

export const signIn = async (username, password) => {
    const response = await queryData(`
        mutation {
            signIn(credentials: {
                    username: "${username}",
                    password: "${password}"
                    }) {
                username
                token
                message
            }
        }
    `);

    return response.signIn;
};

export const signOut = async (username, token) => {
    const response = await queryData(`
        mutation {
            signOut(session: {
                    username: "${username}",
                    token: "${token}"
                    })
        }
    `);

    return response.signOut;
};