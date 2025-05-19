import { Express } from "express";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://sutual:yourRealPassword@cluster0.nwsruxy.mongodb.net/musicapp?retryWrites=true&w=majority&appName=Cluster0';
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