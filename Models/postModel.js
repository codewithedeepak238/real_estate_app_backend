import mongoose from "mongoose";

const postModel = new mongoose.Schema({

}, {timestamps:true});

const POST = mongoose.model('post', postModel);
export default POST