import { getUserAuthenticator } from '../../../domain';


const queryResolvers = {
    verifyAdminAccess: async (_, { userToken }) => {

        try {
            const userContext = getUserAuthenticator().getUserContext(userToken);

            return {
                verified: userContext.validateAdminAccess(),
            };
        }
        catch (error) {
            console.log(error);

            return {
                verified: false
            };
        }
    },
};

const mutationResolvers = {
    signIn: (_, { credentials }) => {
        try {
            return getUserAuthenticator().signIn(credentials.username, credentials.password);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    signOut: (_, { session }) => {
        try {
            return getUserAuthenticator().signOut(session.token);            
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
