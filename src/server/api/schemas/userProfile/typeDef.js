const typeDef = `
    extend type Query {
        userProfile: UserProfileResult
    }

    extend type Mutation {
        saveUserProfile(userProfile: UserProfileInput!, accessToken: String!): Boolean
    }

    type UserProfileResult {
        success: Boolean!
        userProfile: UserProfile
        errorMessage: String
    }

    type UserProfile {
        goodReadsUserId: String!
    }

    input UserProfileInput {
        goodReadsUserId: String
    }
`;


export {
    typeDef
};
