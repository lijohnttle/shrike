import { getAccessValidator, getUserProfileRepository } from '../domain/index.js';

export const typeDef = `
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

export const queryResolvers = {
    userProfile: async () => {
        try {
            const userProfile = await getUserProfileRepository().find();

            return {
                success: true,
                userProfile: {
                    goodReadsUserId: userProfile.goodReadsUserId
                }
            };
        }
        catch (error) {
            console.error(error);

            return {
                success: false,
                errorMessage: 'Error occured while retrieving the user profile'
            };
        }
    },
};

export const mutationResolvers = {
    saveUserProfile: async (_, { userProfile, accessToken }) => {
        
        getAccessValidator().verifyAdminAccess(accessToken);

        try {
            await getUserProfileRepository().save(userProfile);

            return true;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
};
