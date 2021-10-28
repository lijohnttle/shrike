import mongoose from 'mongoose';

let _db = null;

const establishConnection = async () => {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw Error('Failed to detect database connection string');
    }

    console.log('Connecting to the DB...');

    const client = await mongoose.connect(databaseUrl, {
        useNewUrlParser: true
    });

    console.log('Successfully connected');

    client.connection.on('error', err => { logError(err); });
    client.connection.on('close', () => { console.log('-> DB: lost connection'); });
    client.connection.on('reconnect', () => { console.log('-> DB: reconnected'); });
    
    return client;
}

const connect = async () => {
    if (!_db) {
        _db = await establishConnection();
    }

    return _db.connection;
};

const disconnect = async () => {
    if (_db) {
        await _db.disconnect();
    }
};

export default {
    connect,
    disconnect
};
