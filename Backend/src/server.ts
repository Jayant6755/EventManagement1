import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import eventInfo from './Controller/eventController';
import e from 'express';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI!;
mongoose
.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

 
app.use('/api/events', eventInfo);


  


app.listen(5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});