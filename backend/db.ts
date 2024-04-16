import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri: string | undefined = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('MongoDB URI is not provided in the environment variables');
}

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};

let client: MongoClient | null = null;

const connectToMongoDB = async (): Promise<MongoClient> => {
    if (!client) {
        try {
            client = await MongoClient.connect(uri, options);
            console.log("connected to mongodb")
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }
    return client;
};

const getConnectedClient = (): MongoClient | null => client;

export { connectToMongoDB, getConnectedClient };