import mongoose from 'mongoose';
import db from '../server/services/db.js';


/** @type {mongoose.Connection} */
let connection;

/**
 * @returns {Promise<mongoose.Connection>}
 */
const connect = async () => {
    connection = await db.connect();
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
