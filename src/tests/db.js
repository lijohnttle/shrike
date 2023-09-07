import mongoose from 'mongoose';
import db from '../database/databaseConnector.js';


/** @type {mongoose.Connection} */
let connection;

/**
 * @returns {Promise<mongoose.Connection>}
 */
const connect = async () => {
    connection = await db.connect(true);
    return connection;
};

const disconnect = async() => {
    if (connection) {
        await connection.dropDatabase();
        await db.disconnect();
        connection = null;
    }
};

const clear = async () => {
    if (connection) {
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({ });
        }
    }
};


export default {
    connect,
    disconnect,
    clear
};
