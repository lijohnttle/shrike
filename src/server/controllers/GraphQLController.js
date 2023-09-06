import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from '../api/index.js';
import { ControllerContext } from './ControllerContext';
import { ControllerBase } from './ControllerBase';

export class GraphQLController extends ControllerBase {
    constructor() {
        super('GraphQL Controller');
    }

    /**
     * Registers the controller.
     * @param {express.Express} app 
     * @param {ControllerContext} context 
     */
    register(app, context) {
        super.register(app, context);
        super.beginRegister();

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

        super.endRegister();
    }
}
