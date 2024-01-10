const typeDef = `
    extend type Query {
        userProfile: UserProfileResult
    }

    extend type Mutation {
        saveUserProfile(userProfile: UserProfileInput!, userToken: String!): Boolean
    }

    type UserProfileResult {
        success: Boolean!
        userProfile: UserProfile
        errorMessage: String
    }

    type UserProfile {
        goodReadsUserId: String
        greetingsHeader: String
        greetingsText: String
        summary: String
    }

    input UserProfileInput {
        goodReadsUserId: String
        greetingsHeader: String
        greetingsText: String
        summary: String
    }
`;


export {
    typeDef
};
