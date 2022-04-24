import { makeExecutableSchema } from '@graphql-tools/schema';
import { register as registerAccountSchema } from './schemas/account';
import { register as registerBlogSchema } from './schemas/blog';
import { register as registerUserProfileSchema } from './schemas/userProfile';
import { register as registerDiagnosticsSchema } from './schemas/diagnostics';


const Query = `
    type Query {
        version: String!
    }

    type Error {
        message: String!
    }

    type EmptyResult {
        success: Boolean!
        errorMessage: String
    }

    input FileAttachmentInput {
        path: String!
        size: Int!
        data: String
    }
`;

const Mutation = `
    type Mutation
`;


const schemaDef = {
    typeDefs: [
        Query,
        Mutation,
    ],
    queryResolvers: {
        version: () => "v1",
    },
    mutationResolvers: { }
};

registerAccountSchema(schemaDef);
registerBlogSchema(schemaDef);
registerUserProfileSchema(schemaDef);
registerDiagnosticsSchema(schemaDef);


const schema = makeExecutableSchema({
    typeDefs: schemaDef.typeDefs,
    resolvers: {
        Query: schemaDef.queryResolvers,
        Mutation: schemaDef.mutationResolvers,
    }
});


export { schema };
