import express from 'express';
import { ControllerContext } from './ControllerContext';
import { ControllerBase } from './ControllerBase';
import { fetchBooks } from '../services/goodReadsService.js';
import { getUserProfileRepository } from '../domain/index.js';


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

        app.get('/api/blog/filter/definitions', (_, res) => {
            res.json({

            });
        });

        super.endRegister();
    }
}
