import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import 'dotenv/config'
import CreateUserTable from './model/usermodel.js';
import authRouter from "./Routes/authRoutes.js"
import userRouter from './Routes/userRoutes.js';





const app=express();
const port=process.env.PORT || 4000;

CreateUserTable();

const allowedOrigins = (process.env.FRONTEND_URLS || "").split(",");

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.get("/",(req,res)=>{  res.send("API Working");  })
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);

app.listen(port,()=>{console.log(`Server is listening on port ${port}`)});
