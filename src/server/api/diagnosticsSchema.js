import axios from 'axios';
import { getUserVisitCounter } from '../domain/index.js';

export const typeDef = `
    extend type Query {
        userVisits(numVisits: Int!): [UserVisit]
    }

    extend type Mutation {
        recordUserVisit(userVisit: UserVisitInput!): Boolean
    }

    type UserVisit {
        path: String!
        country: String
        city: String
        count: Int
        date: String
    }

    input UserVisitInput {
        path: String!
        country: String
        city: String
        consentAccepted: Boolean!
    }
`;

export const queryResolvers = {
    userVisits: async (_, { numVisits }) => {
        try {
            const visits = await getUserVisitCounter().getVisits(numVisits);

            return visits.map((source) => {
                const result = {
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
        }
        catch (error) {
            console.error(error);

            throw new Error('Error occured while retrieving the user profile');
        }
    },
};

export const mutationResolvers = {
    recordUserVisit: async (_, { userVisit }, context) => {
        try {
            let country = userVisit.country;
            let city = userVisit.city;

            if (!country && !city && userVisit.consentAccepted) {
                const ipAddress = (context.headers['x-forwarded-for'] || context.socket.remoteAddress || '').split(',')[0].trim();

                if (ipAddress) {
                    try {
                        const locationResponse = await axios
                            .get(`http://ip-api.com/json/${ipAddress}`);
    
                        if (locationResponse.data.status === 'success') {
                            country = locationResponse.data.country;
                            city = locationResponse.data.city;
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
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
};
