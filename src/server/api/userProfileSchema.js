import { getGoodReadsUserId } from '../persistence/profileRepository.js';

export const typeDef = `
    extend type Query {
        userProfile: UserProfile
    }

    type UserProfile {
        goodReadsUserId: String!
    }
`;

export const queryResolvers = {
    userProfile: () => {
        return {
            goodReadsUserId: getGoodReadsUserId()
        };
    },
};