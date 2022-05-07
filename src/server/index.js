import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";
import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { registerControllers } from './controllers/index.js';
import { configure as configureDomain } from './domain/index.js';
import db from './services/db.js';

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

const isDevelopment = !process.env.PORT;

if (isDevelopment) {
    process.env.NODE_ENV = 'development';
}

console.log(`Mode: ${process.env.NODE_ENV}`);

async function main() {

    if (isDevelopment) {
        dotenv.config({
            path: path.join(process.cwd(), 'dev.env')
        });
    }

    configureDomain({
        userAuthenticatorOptions: {
            sessionLifetime: 24 * 60 * 60 * 1000,
            sessionCleanUpInterval: 60 * 60 * 1000,
        },
        userVisitCounterOptions: {
            dayVisitCountLimit: 500,
        }
    });

    const app = express();

    if (!isDevelopment) {
        // redirect to www
        app.all(/.*/, (req, res, next) => {
            var host = req.header("host");
            if (host.match(/^www\..*/i)) {
                next();
            } else {
                res.redirect(301, "https://www." + host + req.url);
            }
        });
    }

    app.use(cors());
    app.use(bodyParser.json({
        limit: '15mb'
    }));

    registerControllers(app, {
        rootPath: process.cwd()
    });

    await db.connect();

    process.on('SIGINT', function() {
        console.log('EVENT: SIGINT');

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
