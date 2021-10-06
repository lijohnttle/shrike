import express from 'express';
import path from 'path';

const getName = () => 'Assets Controller';

const register = (app, appContext) => {
    console.log(`Registering ${getName()}...`);

    app.use('/assets', express.static(path.resolve(appContext.rootPath, 'dist/public/assets')));

    console.log('Assets are available at /assets');
    console.log(`Registered ${getName()}`);
};

export default {
    getName,
    register
};