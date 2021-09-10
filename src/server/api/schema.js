import { makeExecutableSchema } from '@graphql-tools/schema';
import {
    typeDef as accountTypeDef,
    mutationResolvers as accountMutationResolvers
 } from './account/schema.js';

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
    ],
    resolvers: {
        Query: {
            getVersion: () => "v1",
        },
        Mutation: {
            ...accountMutationResolvers,
        },
     }
});

export { schema };