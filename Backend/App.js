// app.js
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToDB from './db/db.js';
dotenv.config();
const app = express();
connectToDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Test Route
app.get('/', (req, res) => {
  console.log('Request Received');
  res.send('Hello world');
});


export default app;
