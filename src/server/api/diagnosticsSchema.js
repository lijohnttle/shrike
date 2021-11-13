import axios from 'axios';
import { getAccessValidator, getUserVisitCounter } from '../domain/index.js';

export const typeDef = `
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

export const queryResolvers = {
    userVisits: async (_, { numVisits, accessToken }) => {

        try {
            getAccessValidator().verifyAdminAccess(accessToken);

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
};

export const mutationResolvers = {
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
            return true;
        }
        catch (error) {
            console.error(error);
            
            throw new Error('Error occured while recording a user visit');
        }
    },
    clearAllUserVisits: async (_, { accessToken }) => {
        try {
            getAccessValidator().verifyAdminAccess(accessToken);

            await getUserVisitCounter().clearAll();

            return true;
        }
        catch (error) {
            console.error(error);

            return false;
        }
    },
    deleteUserVisits: async (_, { userVisitIds, accessToken }) => {
        try {
            getAccessValidator().verifyAdminAccess(accessToken);

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
};
