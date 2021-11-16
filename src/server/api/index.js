import { makeExecutableSchema } from '@graphql-tools/schema';

import {
    typeDef as accountTypeDef,
    queryResolvers as accountQueryResolvers,
    mutationResolvers as accountMutationResolvers
 } from './accountSchema.js';

import {
    typeDef as userProfileTypeDef,
    queryResolvers as userProfileQueryResolvers,
    mutationResolvers as userProfileMutationResolvers
} from './userProfileSchema.js';

import {
    typeDef as diagnosticsSchemaTypeDef,
    queryResolvers as diagnosticsSchemaQueryResolvers,
    mutationResolvers as diagnosticsSchemaMutationResolvers
} from './diagnosticsSchema.js';

import {
    typeDef as blogSchemaTypeDef,
    queryResolvers as blogSchemaQueryResolvers,
    mutationResolvers as blogSchemaMutationResolvers
} from './blogSchema.js';


const Query = `
    type Query {
        version: String!
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
        diagnosticsSchemaTypeDef,
        blogSchemaTypeDef,
    ],
    resolvers: {
        Query: {
            version: () => "v1",
            ...accountQueryResolvers,
            ...userProfileQueryResolvers,
            ...diagnosticsSchemaQueryResolvers,
            ...blogSchemaQueryResolvers,
        },
        Mutation: {
            ...accountMutationResolvers,
            ...userProfileMutationResolvers,
            ...diagnosticsSchemaMutationResolvers,
            ...blogSchemaMutationResolvers,
        },
     }
});


export { schema };
