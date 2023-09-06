import express from 'express';
import { ControllerContext } from './ControllerContext';
import { PageController } from './PageController';
import { ApiController } from './ApiController';
import { AssetController } from './AssetController';
import { GraphQLController } from './GraphQLController';
import { ContentController } from './ContentController';


const assetController = new AssetController();
const apiController = new ApiController();
const graphqlController = new GraphQLController();
const pageController = new PageController();
const contentController = new ContentController();


/**
 * Registers all controllers.
 * @param {express.Express} app 
 * @param {ControllerContext} context 
 */
export function registerControllers(app, context) {
    console.log('Registering controllers...');

    // Static assets
    assetController.register(app, context);
    
    // API
    apiController.register(app, context);
    
    // GraphQL
    graphqlController.register(app, context);
    
    // Pages
    pageController.register(app, context);
    
    // Dynamic assets
    contentController.register(app, context);

    // Not Found page
    pageController.registerNotFound(app, context);

    console.log('Registered controllers...');
    console.log('');
};

export {
    ControllerContext
};
