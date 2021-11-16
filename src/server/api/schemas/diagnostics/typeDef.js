const typeDef = `
    extend type Query {
        userVisits(numVisits: Int!, accessToken: String!): UserVisitsResult
    }

    extend type Mutation {
        recordUserVisit(userVisit: UserVisitInput!): Boolean
        clearAllUserVisits(accessToken: String!): Boolean
        deleteUserVisits(userVisitIds: [String!]!, accessToken: String!): Boolean
    }

    type UserVisit {
        id: String!
        path: String!
        country: String
        city: String
        count: Int
        date: String
    }

    type UserVisitsResult {
        success: Boolean!
        userVisits: [UserVisit]
        errorMessage: String
    }

    input UserVisitInput {
        path: String!
    }
`;


export {
    typeDef
};
