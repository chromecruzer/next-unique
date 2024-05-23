import mongoose from 'mongoose';

const connectMongo = async () => {
    if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(process.env.VITE_MONGO_URI); // Removed deprecated options
    }
};

export default connectMongo;
