import path from 'path';
import dotenv from 'dotenv';
import db from './db';

dotenv.config({
    path: path.join(process.cwd(), '/src/tests/test.env')
});

global.connectDb = async () => {
    await db.connect();
};

global.clearDb = async () => {
    await db.clear();
};

global.disconnectDb = async () => {
    await db.disconnect();
};
