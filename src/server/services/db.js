import mongoose from 'mongoose';
import fs from 'fs';

let _db = null;

const saveCertificate = async () => {
    if (await fs.existsSync('ca-certificate.crt')) {
        fs.unlinkSync('ca-certificate.crt');
    }

    const certificate = process.env.DATABASE_CERT;

    if (certificate) {
        await fs.writeFileSync('ca-certificate.crt', certificate);
    }
};

const establishConnection = async () => {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw Error('Failed to detect database connection string');
    }

    console.log('Connecting to the DB...');

    const certificateFileName = await fs.existsSync('ca-certificate.crt') ? 'ca-certificate.crt' : null;

    const client = await mongoose.connect(databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tlsCAFile: certificateFileName
    });

    console.log('Successfully connected');

    client.connection.on('error', err => { logError(err); });
    client.connection.on('close', () => { console.log('-> DB: lost connection'); });
    client.connection.on('reconnect', () => { console.log('-> DB: reconnected'); });
    
    return client;
}

const connect = async () => {
    if (!_db) {
        await saveCertificate();

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
