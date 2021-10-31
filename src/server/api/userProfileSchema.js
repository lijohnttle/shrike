import { getUserProfileRepository } from '../domain/index.js';

export const typeDef = `
    extend type Query {
        userProfile: UserProfile
    }

    extend type Mutation {
        saveUserProfile(userProfile: UserProfileInput, token: String): Boolean
    }

    type UserProfile {
        goodReadsUserId: String!
    }

    input UserProfileInput {
        goodReadsUserId: String
    }
`;

export const queryResolvers = {
    userProfile: async () => {
        try {
            const userProfile = await getUserProfileRepository().find();

            return {
                goodReadsUserId: userProfile.goodReadsUserId
            };
        }
        catch (error) {
            console.error(error);

            throw new Error('Error occured while retrieving the user profile');
        }
    },
};

export const mutationResolvers = {
    saveUserProfile: async (_, { userProfile, token }) => {
        try {
            await getUserProfileRepository().save(userProfile, token);

            return true;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
};
