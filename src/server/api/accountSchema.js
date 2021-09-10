import { signIn, signOut } from '../services/authenticationService.js';

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
    signIn: (_, { credentials }) => signIn(credentials.username, credentials.password),
    signOut: (_, { session }) => signOut(session.username, session.token),
};