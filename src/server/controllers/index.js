import pageController from './pageController.js';
import proxyController from './proxyController.js';
import assetsController from './assetsController.js';
import graphqlController from './graphqlController.js';

const controllers = [
    assetsController,
    proxyController,
    graphqlController,
    pageController
];

const registerControllers = (app, appContext) => {
    console.log('Registering controllers...');

    controllers.forEach((controller) => {
        controller.register(app, appContext);
        console.log('');
    });

    console.log('Registered controllers...');
    console.log('');
};

export {
    registerControllers
};