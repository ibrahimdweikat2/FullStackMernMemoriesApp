import bodyParser from "body-parser";
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';

import postRouter from './routes/Posts.js';
import userRouter from './routes/users.js';


const app=express();
dotenv.config();

app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
app.use(cors());

app.use('/posts',postRouter);
app.use('/users',userRouter);

app.get('/',(req,res)=>{
  res.send('APP IS RUNNING');
});

const PORT=process.env.PORT || 5000;

mongoose.connect(process.env.CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));



