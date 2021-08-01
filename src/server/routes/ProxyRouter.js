import express from 'express';
import { fetchBooks } from '../services/goodReadsService.js';

export default (config) => {
    const proxyRouter = express.Router();

    proxyRouter
        .route('/goodreads/:shelf')
        .get(async (req, res) => {
            const userId = config.goodreads_user_id;
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
    
    return proxyRouter;
}; 