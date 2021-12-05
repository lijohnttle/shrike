const typeDef = `
    extend type Query {
        userVisits(numVisits: Int!, accessToken: String!): UserVisitsResult
        userSessions(username: String!, accessToken: String!): UserSessionResult
    }

    extend type Mutation {
        recordUserVisit(userVisit: UserVisitInput!): Boolean
        clearAllUserVisits(accessToken: String!): Boolean
        deleteUserVisits(userVisitIds: [String!]!, accessToken: String!): Boolean
        deleteUserSessions(ids: [String!]!, accessToken: String!): Boolean
        deleteAllUserSessions(accessToken: String!): Boolean
    }

    type UserVisit {
        id: String!
        path: String!
        country: String
        city: String
        count: Int
        date: String
    }

    type UserSession {
        id: String!
        username: String!
        expired: Boolean!
        updatedOn: String!
    }

    type UserVisitsResult {
        success: Boolean!
        userVisits: [UserVisit]
        errorMessage: String
    }

    type UserSessionResult {
        success: Boolean!
        payload: [UserSession]
        error: Error
    }

    input UserVisitInput {
        path: String!
    }
`;


export {
    typeDef
};
