import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { registerControllers } from './controllers/index.js';
import { configure as configureDomain } from './domain/index.js';
import db from './services/db.js';

const isDevelopment = !process.env.PORT;

async function main() {

    if (isDevelopment) {
        config({ path: process.cwd() + '/dev.env' });
    }

    configureDomain({
        userAuthenticatorOptions: {
            sessionLifetime: 24 * 60 * 60 * 1000,
            sessionCleanUpInterval: 60 * 60 * 1000,
        }
    });

    const app = express();

    app.use(cors());

    registerControllers(app, {
        rootPath: process.cwd()
    });

    await db.connect();

    process.on('SIGINT', function() {
        db.disconnect();
        process.exit();
    });

    app.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);
    });
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
