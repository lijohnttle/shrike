import axios from 'axios';
import { UserVisitRegistrationDto } from '../../../../contracts';
import { extractBlogPostSlugFromUrl } from '../../../../utils/urlBuilder';
import {
    getAccessValidator,
    getUserVisitCounter,
    getUserAuthenticator,
    getBlogManager } from '../../../domain';


const queryResolvers = {
    userVisits: async (_, { numVisits, userToken }) => {

        try {
            getAccessValidator().verifyAdminAccess(userToken);

            try {
                const rawUserVisits = await getUserVisitCounter().getVisits(numVisits);
    
                const userVisits = rawUserVisits.map((source) => {
                    const result = {
                        id: source._id,
                        path: source.path,
                        count: source.count,
                        country: null,
                        city: null,
                        date: source.date.toUTCString()
                    };
    
                    const locations = source.locations;
                    
                    if (locations && locations.length > 0) {
                        result.country = locations[0].country;
                        result.city = locations[0].city;
                    }
    
                    return result;
                });

                return {
                    success: true,
                    userVisits: userVisits
                };
            }
            catch (error) {
                console.error(error);
    
                throw new Error('Error occured while retrieving user visits');
            }
        }
        catch (error) {
            return {
                success: false,
                errorMessage: error.toString()
            };
        }
    },
    userSessions: async (_, { username, userToken }) => {

        try {
            getAccessValidator().verifyAdminAccess(userToken);

            try {
                const rawUserSessions = await getUserAuthenticator().findSessions(username);
    
                const userSessions = rawUserSessions.map((source) => {
                    const result = {
                        id: source.id,
                        username: source.username,
                        expired: source.isExpired,
                        updatedOn: source.updatedOn.toUTCString()
                    };
    
                    return result;
                });

                return {
                    success: true,
                    payload: userSessions
                };
            }
            catch (error) {
                console.error(error);
    
                throw new Error('Error occured while retrieving user visits');
            }
        }
        catch (error) {
            return {
                success: false,
                error: {
                    message: error.toString(),
                },
            };
        }
    },
};

const mutationResolvers = {
    /**
     * Registers user visits.
     * @param {*} _ 
     * @param {Object} params
     * @param {UserVisitRegistrationDto} params.userVisit
     * @param {*} context 
     * @returns 
     */
    recordUserVisit: async (_, { userVisit }, context) => {
        try {
            let country = '';
            let city = '';

            const ipAddress = (context.headers['x-forwarded-for'] || context.socket.remoteAddress || '').split(',')[0].trim();

            if (ipAddress) {
                try {
                    const locationResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`);

                    if (locationResponse?.data?.status === 'success') {
                        country = locationResponse.data.country;
                        city = locationResponse.data.city;
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }

            await getUserVisitCounter().recordVisit(userVisit.path, country, city);

            const blogPostSlug = extractBlogPostSlugFromUrl(userVisit.path);

            if (blogPostSlug) {
                await getBlogManager().registerVisit(blogPostSlug);
            }

            return true;
        }
        catch (error) {
            console.error(error);
            
            throw new Error('Error occured while recording a user visit');
        }
    },
    clearAllUserVisits: async (_, { userToken }) => {
        try {
            getAccessValidator().verifyAdminAccess(userToken);

            await getUserVisitCounter().clearAll();

            return true;
        }
        catch (error) {
            console.error(error);

            return false;
        }
    },
    deleteUserVisits: async (_, { userVisitIds, userToken }) => {
        try {
            getAccessValidator().verifyAdminAccess(userToken);

            if (userVisitIds.length === 0) {
                return false;
            }

            await getUserVisitCounter().delete(userVisitIds);

            return true;
        }
        catch (error) {
            console.error(error);

            return false;
        }
    },
    deleteUserSessions: async (_, { ids, userToken }) => {
        try {
            getAccessValidator().verifyAdminAccess(userToken);

            if (ids.length === 0) {
                return false;
            }

            const userAuthenticator = getUserAuthenticator();

            for (const id of ids) {
                await userAuthenticator.signOutById(id);
            }

            return true;
        }
        catch (error) {
            console.error(error);

            return false;
        }
    },
    deleteAllUserSessions: async (_, { userToken }) => {
        try {
            getAccessValidator().verifyAdminAccess(userToken);

            await getUserAuthenticator().signOutEveryone();

            return true;
        }
        catch (error) {
            console.error(error);

            return false;
        }
    },
};


export {
    queryResolvers,
    mutationResolvers,
}
