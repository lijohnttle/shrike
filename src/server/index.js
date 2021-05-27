import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";
import express from 'express';
import cors from 'cors';
import path from 'path';
import config from './config.js';
import { schema, resolvers } from './data/index.js';
import { graphqlHTTP } from 'express-graphql';
import ProxyRouter from './routes/ProxyRouter.js';

const rootPath = process.cwd();
const app = express();
const allowedOrigins = ['https://www.goodreads.com/'];
const proxyRouter = ProxyRouter(config);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                      'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        
        return callback(null, true);
    },
}));

app.use('/assets', express.static(path.resolve(rootPath, 'dist/public/assets')));
app.use('/proxy', proxyRouter);

const indexPageGetHandler = (_, res) => {
    res.setHeader('content-type', 'text/html');
    res.setHeader('access-control-allow-origin', '*');
    res.sendFile(path.resolve(rootPath, 'dist/public/index.html'));
};

[
    '/',
    '/cv',
    '/projects'
].forEach(url => app.get(url, indexPageGetHandler))

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
});
