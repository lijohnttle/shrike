import express from 'express';
import { fetchBooks } from '../services/goodReadsService.js';
import { getGoodReadsUserId } from '../persistence/profileRepository.js';

const getName = () => 'Proxy Controller';

const register = (app, appContext) => {

    console.log(`Registering ${getName()}...`);

    const proxyRouter = express.Router();

    proxyRouter
        .route('/goodreads/:shelf')
        .get(async (req, res) => {
            const shelf = req.params.shelf;
            const count = req.query.count;

            try {
                const userId = await getGoodReadsUserId();

                const data = await fetchBooks(
                    userId,
                    count,
                    shelf
                );

                res.send(data);
            }
            catch (exception) {
                res.send(exception);
            };
        });

    app.use('/proxy', proxyRouter);

    appContext.allowCorsOrigin('https://www.goodreads.com/');

    console.log('Proxies are available at /proxy');
    console.log(`Registered ${getName()}`);
};

export default {
    getName,
    register
};