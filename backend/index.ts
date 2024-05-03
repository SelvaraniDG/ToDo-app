import express from "express";
import { connectToMongoDB } from "./db";
import dotenv from "dotenv";
import router from './routes';

dotenv.config();

const app = express();
app.use(express.json());

const port: number = parseInt(process.env.PORT || '3001');

async function startServer() {
    try {
        await connectToMongoDB();
        app.use('/api', router);
        app.listen(port, () => {
            console.log(`Server is listening on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();