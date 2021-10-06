import path from 'path';

const getName = () => 'Page Controller';

const register = (app, appContext) => {
    console.log(`Registering ${getName()}...`);

    const rootPath = appContext.rootPath;

    const getIndexHandler = (_, res) => {
        res.setHeader('content-type', 'text/html');
        res.setHeader('access-control-allow-origin', '*');
    
        res.sendFile(path.resolve(rootPath, 'dist/public/index.html'));
    };

    const pageUrls = [
        '/',
        '/about',
        '/account/signin',
        '/account/management',
    ];
    
    pageUrls.forEach(url => app.get(url, getIndexHandler));

    console.log('The next pages have been registered:');
    pageUrls.forEach((url) => console.log(url));
    console.log(`Registered ${getName()}`);
};

export default {
    register
};