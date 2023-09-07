import mongoose from 'mongoose';
import fs from 'fs';

/** @type {mongoose.Mongoose} */
let _db = null;
let _mongo = null;

/**
 * @summary Saves the DB access certificate from the environment variable DATABASE_CERT into a file.
 */
const saveCertificate = () => {
    if (fs.existsSync('ca-certificate.crt')) {
        fs.unlinkSync('ca-certificate.crt');
    }

    const certificate = process.env.DATABASE_CERT;

    if (certificate) {
        fs.writeFile('ca-certificate.crt', certificate);
    }
};

/**
 * @summary Connects to the DB.
 */
const establishConnection = async () => {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw Error('Failed to detect database connection string');
    }

    const certificateFileName = fs.existsSync('ca-certificate.crt') ? 'ca-certificate.crt' : null;
    
    if (certificateFileName) {
        console.log(`Found certificate file ${certificateFileName}`);
    }
    else {
        console.log(`Certificate file was not found`);
    }

    console.log('Connecting to the DB...');

    try {
        const client = await mongoose.connect(databaseUrl, {
            tlsCAFile: certificateFileName
        });

        console.log('Successfully connected');

        client.connection.on('error', err => { logError(err); });
        client.connection.on('close', () => { console.log('-> DB: lost connection'); });
        client.connection.on('reconnect', () => { console.log('-> DB: reconnected'); });
        
        return client;
    }
    catch (ex) {
        console.error('Failed to establish DB connection');
        throw ex;
    }
}

/**
 * @summary Creates MongoDB DB in-memory..
 */
const createInMemoryDb = async () => {
    _mongo = await require("mongodb-memory-server").MongoMemoryServer.create();
    const databaseUrl = _mongo.getUri();

    if (!databaseUrl) {
        throw Error('Failed to create in-memory database');
    }

    console.log('Connecting to the DB...');

    try {
        const client = await mongoose.connect(databaseUrl, { });

        console.log('Successfully connected');

        client.connection.on('error', err => { logError(err); });
        client.connection.on('close', () => { console.log('-> DB: lost connection'); });
        client.connection.on('reconnect', () => { console.log('-> DB: reconnected'); });
        
        return client;
    }
    catch (ex) {
        console.error('Failed to establish DB connection');
        throw ex;
    }
}

/**
 * @param {Boolean} inMemory Creates in-memory database. Default values is false.
 * @returns {Promise<mongoose.Connection>}
 */
const connect = async (inMemory = false) => {
    if (!_db) {
        saveCertificate();

        if (inMemory) {
            _db = await createInMemoryDb();
        }
        else {
            _db = await establishConnection();
        }
    }

    return _db.connection;
};

const disconnect = async () => {
    if (_db) {
        await _db.disconnect();

        _db = null;
    }

    if (_mongo) {
        await _mongo.stop();
    }
};

export default {
    connect,
    disconnect
};
