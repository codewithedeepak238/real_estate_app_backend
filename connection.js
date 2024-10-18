import mongoose from "mongoose";

export async function connectToMongo(url){
    return mongoose.connect(url);
}
