import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import connectDb from './config/postgres.js'
import CreateUserTable from './model/usermodel.js';
import authRouter from "./Routes/authRoutes.js"
import userRouter from './Routes/userRoutes.js';





const app=express();
const port=4000;

CreateUserTable();


// console.log("🔑 Password type:", typeof process.env.PASSWORD); // should be string
app.use(express.json());
app.use(cookieParser());
// app.use(cors({origin:["http://192.168.31.216:5173","http://localhost:5173"],credentials:true}))
app.use(cors({origin:process.env.FRONTEND_URL,credentials:true}))



app.get("/",(req,res)=>{  res.send("API Working");  })
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);

app.listen(port,()=>{console.log(`Server is listening on port ${port}`)});