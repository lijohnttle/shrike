import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express';
import path from 'path';
import config from './config';
import { schema, resolvers } from './data';
import graphqlHTTP from 'express-graphql';

const rootPath = process.cwd(); // path.resolve(__dirname, '../../');
const app = express();

app.use(express.static(path.resolve(rootPath, 'public')));

const indexPageGetHandler = (_, res) => {
    res.setHeader('content-type', 'text/html');
    res.sendFile(path.resolve(rootPath, 'public/index.html'));
};

app.get('/', indexPageGetHandler);
app.get('/cv', indexPageGetHandler);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

app.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}`);
});
