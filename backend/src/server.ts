import express from 'express';
  import mongoose from 'mongoose';
  import dotenv from 'dotenv';
  import cors from 'cors';
  
  dotenv.config();
  const app = express();
  
  app.use(cors());
  app.use(express.json());
  
  const PORT = process.env.PORT || 5000;
  const MONGO_URI = process.env.MONGO_URI || '';
  
  mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  