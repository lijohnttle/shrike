import { graphqlHTTP } from 'express-graphql';
import { schema } from '../api/schema.js';

const register = (app) => {
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true
    }));
};

export default {
    register
};