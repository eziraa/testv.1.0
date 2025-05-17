import { Express } from "express";
import mongoose from "mongoose";
import listEndpoints from 'express-list-endpoints'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test_songs';
const PORT = process.env.PORT || 5000

// DB CONECTION
const DBConnection = (app: Express) => {
    mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        
    })
    .catch(err => console.error(err));
}

export default DBConnection;