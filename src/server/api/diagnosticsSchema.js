import axios from 'axios';
import { getUserVisitCounter } from '../domain/index.js';

export const typeDef = `
    extend type Mutation {
        recordUserVisit(userVisit: UserVisitInput!): Boolean
    }

    input UserVisitInput {
        path: String!
        country: String
        city: String
        consentAccepted: Boolean!
    }
`;

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
            throw error;
        }
    },
};
