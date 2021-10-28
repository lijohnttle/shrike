import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import db from '../services/db.js';

const mongod = new MongoMemoryServer();

let initialized = false;

const connect = async () => {
    if (!initialized) {
        await mongod.start();

        const uri = mongod.getUri();

        process.env.DATABASE_URL = uri;
    }
    
    return await db.connect();
};

const disconnect = async() => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

const clear = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};

export default {
    connect,
    disconnect,
    clear
};