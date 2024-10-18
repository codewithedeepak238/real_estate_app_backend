import express from "express";
import * as dotenv from 'dotenv';
import cors from "cors";
import postRoute from "./Routes/authRoute.js"
import authorizationRoute from "./Routes/authorizationRoute.js"
import {connectToMongo} from "./connection.js"
import cookieParser from "cookie-parser";


dotenv.config();

//Port Details
const PORT = process.env.PORT || 8000;

// Express instance
const app = express();

//MongoDB connection
connectToMongo(process.env.MONGODB_URL).then(()=>console.log("MongoDB Connected!!")).catch((err)=>console.log(err));


//Middlewares
app.use(cors({origin: process.env.CLIENT_URL, allowedHeaders: ["Content-Type", "Authorization"], credentials:true}));
app.options('*', cors())
app.all('', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //Auth Each API Request created by user.
    next();
});
app.use(express.json());
app.use(cookieParser());


//Routes
app.use("/auth", postRoute);

app.use("/api", authorizationRoute);


app.listen(PORT, console.log("Server Started on Port 8000"))