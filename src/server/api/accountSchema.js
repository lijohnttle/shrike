import { signIn, signOut } from '../domain/services/authentication/userAuthenticator.js';

export const typeDef = `
    extend type Mutation {
        signIn(credentials: CredentialsInput!): AuthenticationResult
        signOut(session: SessionInput!): Boolean
    }

    input CredentialsInput {
        username: String!
        password: String!
    }

    type AuthenticationResult {
        username: String,
        token: String
        message: String
    }

    input SessionInput {
        username: String!
        token: String!
    }
`;

export const mutationResolvers = {
    signIn: (_, { credentials }) => {
        try {
            return signIn(credentials.username, credentials.password);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    signOut: (_, { session }) => {
        try {
            return signOut(session.token);            
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
};
