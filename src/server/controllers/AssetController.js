import express from 'express';
import path from 'path';
import { ControllerContext } from './ControllerContext';
import { ControllerBase } from './ControllerBase';

export class AssetController extends ControllerBase {
    constructor() {
        super('Asset Controller');
    }

    /**
     * Registers the controller.
     * @param {express.Express} app 
     * @param {ControllerContext} context 
     */
    register(app, context) {
        super.register(app, context);
        super.beginRegister();

        app.use('/assets', express.static(path.resolve(context.rootPath, 'dist/public/assets')));

        super.endRegister();
    }
}
