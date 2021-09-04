import express from 'express';
import { fetchBooks } from '../services/goodReadsService.js';

const register = (app, appContext) => {

    const proxyRouter = express.Router();

    proxyRouter
        .route('/goodreads/:shelf')
        .get(async (req, res) => {
            const userId = appContext.config.goodreads_user_id;
            const shelf = req.params.shelf;
            const count = req.query.count;

            try {
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
};

export default {
    register
};