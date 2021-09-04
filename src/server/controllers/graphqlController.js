import { graphqlHTTP } from 'express-graphql';
import { schema } from '../data/schema.js';
import { resolvers } from '../data/resolvers.js';

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