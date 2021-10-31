import { makeExecutableSchema } from '@graphql-tools/schema';

import {
    typeDef as accountTypeDef,
    mutationResolvers as accountMutationResolvers
 } from './accountSchema.js';

 import {
    typeDef as userProfileTypeDef,
    queryResolvers as userProfileQueryResolvers,
    mutationResolvers as userProfileMutationResolvers
 } from './userProfileSchema.js';

const Query = `
    type Query {
        getVersion: String!
    }
`;

const Mutation = `
    type Mutation
`;

const schema = makeExecutableSchema({
    typeDefs: [
        Query,
        Mutation,
        accountTypeDef,
        userProfileTypeDef,
    ],
    resolvers: {
        Query: {
            getVersion: () => "v1",
            ...userProfileQueryResolvers,
        },
        Mutation: {
            ...accountMutationResolvers,
            ...userProfileMutationResolvers,
        },
     }
});

export { schema };
