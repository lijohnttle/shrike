import { MongoClient } from 'mongodb';

export const connectToDb = async () => {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw Error('Failed to detect database connection string');
    }

    const client = await MongoClient.connect(databaseUrl, { useNewUrlParser: true });

    return client.db();
};