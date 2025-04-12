// app.js
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToDB from './db/db.js';
import errorMiddleware from './Middlewares/errorMiddleware.js';
import userRoutes from './Routes/user.routes.js';
import morgan from 'morgan';
import contactRoutes from './Routes/contact.routes.js';
import invitationRoutes from './Routes/invitation.routes.js';

dotenv.config();
const app = express();
connectToDB();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
// Middleware
app.use(cors( corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// Test Route
app.get('/', (req, res) => {
  console.log('Request Received');
  res.send('Hello world');
});

app.use('/users', userRoutes);
app.use("/contacts", contactRoutes);
app.use("/invitations", invitationRoutes);

// Use the error handling middleware
app.use(errorMiddleware);

export default app;
