import AuthenticationResult from './AuthenticationResult.js';

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
    authenticate: (_, { credentials }) => { 
        return new AuthenticationResult({
            username: credentials.username,
            authenticated: true,
            token: 'token'
        });
    }
};