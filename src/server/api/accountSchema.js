import { authenticate } from '../services/authenticationService.js';

export const typeDef = `
    extend type Mutation {
        authenticate(credentials: CredentialsInput!): AuthenticationResult
    }

    input CredentialsInput {
        username: String!
        password: String!
    }

    type AuthenticationResult {
        username: String,
        authenticated: Boolean!
        token: String
        message: String
    }
`;

export const mutationResolvers = {
    authenticate: (_, { credentials }) => authenticate(credentials.username, credentials.password)
};