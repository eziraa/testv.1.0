import { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ezirayallew:ezirayallew@cluster0.tyqau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = process.env.PORT || 5000
console.log(MONGO_URI);
// DB CONECTION
const DBConnection = (app: Express) => {
    mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        
    })
    .catch(err => console.error(err));
}


export default DBConnection;