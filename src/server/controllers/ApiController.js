import express from 'express';
import { ControllerContext } from './ControllerContext';
import { ControllerBase } from './ControllerBase';
import { blogApiRouter } from './api/blog';
import { booksApiRouter } from './api/books';


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

        app.use('/api/blog', blogApiRouter);
        app.use('/api/books', booksApiRouter);

        super.endRegister();
    }
}
