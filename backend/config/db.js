import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://barnabassoren54_db_user:resume123@cluster0.h6kudxl.mongodb.net/RESUME')
    .then(() => console.log("DB connnected"))
}