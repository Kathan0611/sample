const express = require("express");
const fs = require("fs");
const app = express();
const morgan = require("morgan");
const dotenv =require('dotenv');
const mongoose=require('mongoose');
// const userRouter=express.Router();
dotenv.config({path:'./config.env'});
const tourRouter=require('./Router/tourRouter');
const userRouter=require('./Router/UserRouter');
app.use(express.json());
app.use(morgan("dev"));
app.use('/api/v1/users',userRouter);
app.use('/api/v1/tours',tourRouter);
app.use(express.static(`${__dirname}/public`))

const DB =process.env.DATABASE.replace('<password>',process.env.PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
    maxIdleTimeMS:100000
   })
  .then((con)=>console.log('DB connection successful'))
   .catch(err=>console.log(err));



app.listen(process.env.port, () => {
  console.log(`server running in port ${process.env.port} `);
});
