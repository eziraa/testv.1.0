import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import songRoutes from './routes/song.routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/songs', songRoutes);

export default app;
