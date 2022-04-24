import { getUserAuthenticator, getUserProfileRepository } from '../../../domain';


const queryResolvers = {
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

const mutationResolvers = {
    saveUserProfile: async (_, { userProfile, accessToken }) => {

        const userContext = getUserAuthenticator().getUserContext(accessToken);

        userContext.verifyAdminAccess();

        try {
            await getUserProfileRepository().save(userProfile, userContext);

            return true;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
};


export {
    queryResolvers,
    mutationResolvers,
}
