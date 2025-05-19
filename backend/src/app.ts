import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import songRoutes from './routes/song.routes';
import albumRoutes from './routes/album.routes';
import artistRoutes from './routes/artist.routes';
import playlistRoutes from './routes/playlist.routes';
import authRoutes from './routes/auth.routes';
import fileUpLoaderRoutes from './routes/fileuploader';
import path from 'path';
import { getDashboardStats } from './controllers/stat.conteroller';



declare global {
    namespace NodeJS {
        interface Request extends Express.Request{}
        interface Response extends Express.Response{}
    }
}
dotenv.config();
const app = express();

app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public/')));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/fileuploader',fileUpLoaderRoutes);
app.use('/api/stats', getDashboardStats)


app.get('/', (req, res) => {
    res.send('Welcome to the Music API');
});


export default app;
