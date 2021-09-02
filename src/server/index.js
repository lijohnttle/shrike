import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";
import express from 'express';
import cors from 'cors';
import config from './config.js';
import { registerControllers } from './controllers/index.js';

const allowedCorsOrigins = [];
const app = express();

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }

        if (allowedCorsOrigins.indexOf(origin) === -1) {
            return callback(
                new Error('The CORS policy for this site does not allow access from the specified Origin.'),
                false);
        }
        
        return callback(null, true);
    },
}));

registerControllers(app, {
    rootPath: process.cwd(),
    config,
    allowCorsOrigin: (origin) => allowedCorsOrigins.push(origin)
});


app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
});
