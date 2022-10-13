import mongoose from 'mongoose';
const connectWithDb = async () => {
    mongoose.connect(process.env.DB_URL as string);
}

export default connectWithDb;