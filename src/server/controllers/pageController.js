import path from 'path';
import { urlList } from '../../static.js';


const getName = () => 'Page Controller';

const register = (app, appContext) => {
    console.log(`Registering ${getName()}...`);

    const getIndexHandler = (_, res) => {
        res.setHeader('content-type', 'text/html');
        res.setHeader('access-control-allow-origin', '*');
    
        res.sendFile(path.resolve(appContext.rootPath, 'dist/public/index.html'));
    };

    console.log('Registering the next pages:');
    Object.values(urlList).forEach(url => {
        app.get(url, getIndexHandler);
        console.log(url);
    });
    console.log(`Registered ${getName()}`);
};

const useNotFound = (app, appContext) => {
    console.log(`Registering NotFound page...`);

    app.get('*', (req, res) => {
        res.status(404);

        // respond with html page
        if (req.accepts('html')) {
            res.setHeader('content-type', 'text/html');
            res.setHeader('access-control-allow-origin', '*');
        
            res.sendFile(path.resolve(appContext.rootPath, 'dist/public/index.html'));
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


export default {
    register,
    useNotFound
};