import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express';
import path from 'path';
import config from './config';
import { schema, resolvers } from './data';
import graphqlHTTP from 'express-graphql';

const rootPath = process.cwd();
const app = express();

app.use(express.static(path.resolve(rootPath, 'dist/public')));

const indexPageGetHandler = (_, res) => {
    res.setHeader('content-type', 'text/html');
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

app.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}`);
});
