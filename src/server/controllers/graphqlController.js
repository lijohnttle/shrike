import { graphqlHTTP } from 'express-graphql';
import { schema } from '../api/index.js';

const getName = () => 'GraphQL Controller';

const register = (app) => {
    console.log(`Registering ${getName()}...`);

    /** @type {import('express-graphql').Options} */
    const graphqlHTTPOptions = {
        schema: schema,
        graphiql: true,
        customFormatErrorFn: (error) => {
            logger.warn(error.message, { error })
            return formatError(error)
        },
    };

    if (process.env.NODE_ENV === 'development') {
        graphqlHTTPOptions.customFormatErrorFn = (error) => {
            console.log(error);

            return {
                message: error.message,
                locations: error.locations,
                stack: error.stack ? error.stack.split('\n') : [],
                path: error.path,
            };
        };
    }

    app.use('/graphql', graphqlHTTP(graphqlHTTPOptions));

    console.log('GraphQL is available at /graphql');
    console.log(`Registered ${getName()}`);
};

export default {
    getName,
    register
};