/// <reference types="node" />
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path, { dirname } from 'path';    // <- added to specify .env
import ticketRoutes from './routes/tickets';

// <-- tell dotenv exactly where the .env file is
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('Loading env from:', path.resolve(__dirname, '../.env'));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/tickets', ticketRoutes);

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("Missing MONGO_URI in environment variables");
}

console.log('MONGO_URI:', process.env.MONGO_URI); 
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error:', err));
