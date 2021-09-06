import { graphqlHTTP } from 'express-graphql';
import { schema } from '../api/schema.js';
import { resolvers } from '../api/resolvers.js';

const register = (app) => {
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true
    }));
};

export default {
    register
};