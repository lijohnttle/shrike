import { graphqlHTTP } from 'express-graphql';
import { schema } from '../api/index.js';

const getName = () => 'GraphQL Controller';

const register = (app) => {
    console.log(`Registering ${getName()}...`);

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true
    }));

    console.log('GraphQL is available at /graphql');
    console.log(`Registered ${getName()}`);
};

export default {
    getName,
    register
};