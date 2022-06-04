import express from 'express';
import { ControllerContext } from './ControllerContext';
import { ControllerBase } from './ControllerBase';
import { fetchBooks } from '../services/goodReadsService.js';
import { getBlogManager, getUserProfileRepository } from '../domain';


export class ApiController extends ControllerBase {
    constructor() {
        super('API Controller');
    }

    /**
     * Registers the controller.
     * @param {express.Express} app 
     * @param {ControllerContext} context 
     */
    register(app, context) {
        super.register(app, context);
        super.beginRegister();

        app.get('/api/goodreads/:shelf', async (req, res) => {
            const shelf = req.params.shelf;
            const count = req.query.count;

            try {
                const userProfile = await getUserProfileRepository().find();
                const userId = userProfile.goodReadsUserId;

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

        app.get('/api/blog/filter/definition', async (_, res) => {
            const blogManager = getBlogManager();

            res.json({
                categories: await blogManager.getCategories(),
            });
        });

        super.endRegister();
    }
}
