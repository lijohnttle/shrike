import express from 'express';
import path from 'path';
import config from './config';

const rootPath = process.cwd(); // path.resolve(__dirname, '../../');
const app = express();

app.use(express.static(path.resolve(rootPath, 'public')));

app.get('/', (req, res) => {
    res.setHeader('content-type', 'text/html');
    res.sendFile(path.resolve(rootPath, 'public/index.html'));
});

app.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}`);
});
