import mongoose from 'mongoose';

const connectToDB = async () => {
    try {
        // Attempt to connect to the MongoDB URI
        await mongoose.connect(process.env.MONGO_URI, {

        });
        console.log('Database connected successfully');
    } catch (error) {
        // Log detailed error information
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit the process if the DB connection fails
    }
};

export default connectToDB;
