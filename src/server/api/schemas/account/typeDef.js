const typeDef = `
    extend type Query {
        verifyAdminAccess(userToken: String!): VerificationResult
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

export {
    typeDef
};
