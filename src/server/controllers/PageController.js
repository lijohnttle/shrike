import express from 'express';
import path from 'path';
import { ControllerContext } from './ControllerContext';
import { ControllerBase } from './ControllerBase';
import { pagesDescriptors } from '../../static.js';

export class PageController extends ControllerBase {
    constructor() {
        super('Page Controller');
    }

    /**
     * Registers the controller.
     * @param {express.Express} app 
     * @param {ControllerContext} context 
     */
    register(app, context) {
        super.register(app, context);
        super.beginRegister();

        const getIndexHandler = (_, res) => {
            try {
                res.setHeader('content-type', 'text/html');
                res.setHeader('access-control-allow-origin', '*');
            
                res.sendFile(path.resolve(context.rootPath, 'dist/public/index.html'));
            }
            catch (ex) {
                console.log(ex);
                throw ex;
            }
        };
    
        console.log('Registering the next pages:');
        Object.values(pagesDescriptors).forEach(pageDescriptor => {
            app.get(pageDescriptor.path, getIndexHandler);
            console.log(pageDescriptor.path);
        });

        super.endRegister();
    }

    /**
     * Registers not found page.
     * @param {express.Express} app 
     * @param {ControllerContext} context 
     */
    registerNotFound(app, context) {
        console.log(`Registering NotFound page...`);
    
        app.get('*', (req, res) => {
            res.status(404);
    
            // respond with html page
            if (req.accepts('html')) {
                res.setHeader('content-type', 'text/html');
                res.setHeader('access-control-allow-origin', '*');
            
                res.sendFile(path.resolve(context.rootPath, 'dist/public/index.html'));
                return;
            }
    
            // respond with json
            if (req.accepts('json')) {
                res.json({ error: 'Not found' });
                return;
            }
    
            // default to plain-text. send()
            res.type('txt').send('Not found');
        });
    
        console.log(`Registered NotFound page`);
    };
}
