const mongoose = require('mongoose');
// console.log(process.env)
const tourSchema =new mongoose.Schema({
    name:{
      type:String,
      required:[true,'A tour must have a name'],
      unique:true
    }
    ,
    rating:{
      type:Number,
      default:4.5
      },
    price:{
      type:Number,
      required:[true,'A tour must have a price']
    }
  })
  const Tours=mongoose.model('Tours',tourSchema);

  module.exports=Tours;
