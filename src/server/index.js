import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { registerControllers } from './controllers/index.js';
import { useDb } from './services/databaseUtil.js';

const isDevelopment = !process.env.PORT;

async function main() {

    if (isDevelopment) {
        config({ path: process.cwd() + '/dev.env' });
    }

    const allowedCorsOrigins = [];
    const app = express();

    app.use(cors({
        origin: (origin, callback) => {
            if (!origin) {
                return callback(null, true);
            }

            if (origin.endsWith(`localhost:${process.env.PORT}`)) {
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
        allowCorsOrigin: (origin) => allowedCorsOrigins.push(origin)
    });

    await useDb();

    app.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);
    });
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
