import path from 'path';

const register = (app, appContext) => {
    
    const rootPath = appContext.rootPath;

    const getIndexHandler = (_, res) => {
        res.setHeader('content-type', 'text/html');
        res.setHeader('access-control-allow-origin', '*');
    
        res.sendFile(path.resolve(rootPath, 'dist/public/index.html'));
    };

    [
        '/',
    ].forEach(url => app.get(url, getIndexHandler));
};

export default {
    register
};