import path from 'path';
import { urlList } from '../../static.js';


const getName = () => 'Page Controller';

const register = (app, appContext) => {
    console.log(`Registering ${getName()}...`);

    const rootPath = appContext.rootPath;

    const getIndexHandler = (_, res) => {
        res.setHeader('content-type', 'text/html');
        res.setHeader('access-control-allow-origin', '*');
    
        res.sendFile(path.resolve(rootPath, 'dist/public/index.html'));
    };

    console.log('Registering the next pages:');
    Object.values(urlList).forEach(url => {
        app.get(url, getIndexHandler);
        console.log(url);
    });
    console.log(`Registered ${getName()}`);
};


export default {
    register
};