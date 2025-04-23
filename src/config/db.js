import mongoose from "mongoose";
import { DB_URI } from "./env.js";
// import logger from '../utils/logger'
mongoose.set('strictQuery', true)

export async function connectDb() {
    try {
        await mongoose.connect(DB_URI)
        console.log("MongoDB connected successfully!")
    } catch (error) {
        console.error('MongoDB connection failed', error)
    }
}