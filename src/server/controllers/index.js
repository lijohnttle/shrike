import pageController from './pageController.js';
import proxyController from './proxyController.js';
import assetsController from './assetsController.js';
import graphqlController from './graphqlController.js';

const registerControllers = (app, appContext) => {
    [
        assetsController,
        proxyController,
        graphqlController,
        pageController
    ].forEach(controller => controller.register(app, appContext));
};

export {
    registerControllers
};