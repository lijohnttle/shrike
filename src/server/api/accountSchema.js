import { getAccessValidator, getUserAuthenticator } from '../domain/index.js';

export const typeDef = `
    extend type Query {
        verifyAdminAccess(accessToken: String!): VerificationResult
    }

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

    type VerificationResult {
        verified: Boolean!
    }
`;

export const queryResolvers = {
    verifyAdminAccess: async (_, { accessToken }) => {

        try {
            return {
                verified: getAccessValidator().validateAdminAccess(accessToken)
            };
        }
        catch (error) {
            return {
                verified: false
            };
        }
    },
};

export const mutationResolvers = {
    signIn: (_, { credentials }) => {
        try {
            return getUserAuthenticator().signIn(credentials.username, credentials.password);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    signOut: (_, { session }) => {
        try {
            return getUserAuthenticator().signOut(session.token);            
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
};
