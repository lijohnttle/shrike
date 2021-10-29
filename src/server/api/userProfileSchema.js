import { get as getUserProfile, save } from '../persistence/userProfileRepository.js';

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
            const userProfile = await getUserProfile();

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
            await save(userProfile, token);

            return true;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
};
