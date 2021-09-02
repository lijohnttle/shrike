import express from 'express';
import path from 'path';

const register = (app, appContext) => {
    app.use('/assets', express.static(path.resolve(appContext.rootPath, 'dist/public/assets')));
};

export default {
    register
};