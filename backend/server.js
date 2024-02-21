import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config()
import userRoutes from './routes/userRoutes.js'
import { notFound,errorHandler } from './middlewares/errorMiddleware.js';
import connectDB from './database/db.js';
import cors from 'cors'
import {data} from './testdata.js'
connectDB();

const app = express();
app.use(cors({
    origin:'http://localhost:5173'
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
const port = process.env.PORT;
app.use("/api/users",userRoutes);

app.get("/",(req,res)=>{
    res.send("From the backend baby");
})

app.get("/api/chat",(req,res)=>{
    res.json(data)
})

app.use(notFound);
app.use(errorHandler);
app.listen(5000, ()=> console.log(`Server running on port ${port}`))

