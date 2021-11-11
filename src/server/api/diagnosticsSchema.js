import { getUserVisitCounter } from '../domain/index.js';

export const typeDef = `
    extend type Mutation {
        recordUserVisit(userVisit: UserVisitInput!): Boolean
    }

    input UserVisitInput {
        page: String!
        country: String
        city: String
    }
`;

export const mutationResolvers = {
    recordUserVisit: (_, { userVisit }) => {
        try {
            getUserVisitCounter().recordVisit(userVisit.path, userVisit.country, userVisit.city);
            return true;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
};
