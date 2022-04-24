const typeDef = `
    extend type Query {
        userVisits(numVisits: Int!, userToken: String!): UserVisitsResult
        userSessions(username: String!, userToken: String!): UserSessionResult
    }

    extend type Mutation {
        recordUserVisit(userVisit: UserVisitInput!): Boolean
        clearAllUserVisits(userToken: String!): Boolean
        deleteUserVisits(userVisitIds: [String!]!, userToken: String!): Boolean
        deleteUserSessions(ids: [String!]!, userToken: String!): Boolean
        deleteAllUserSessions(userToken: String!): Boolean
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
