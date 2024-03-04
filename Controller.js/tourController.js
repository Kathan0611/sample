const fs = require("fs");
const Tours = require("../model/tourModel");
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../tour.json`));
const mongoose =require('mongoose')
const dotenv =require('dotenv');
// const app=require('app')
dotenv.config({path:'./config.env'});
exports.getAllTours = async(req, res) => {
  try{
    const tours =  await Tours.find()
  res.status(200).json({
    status: "sucess",
    data: {
      tours,
    },
  });
}
catch(err){
 
  res.status(404).json({
    status: "fail",
    message: "not found",
  });
}

  }

exports.createTour = async (req, res) => {
try{
  const newTour = await new Tours(req.body);
   newTour.save();

  res.status(201).json({
    status: "Success",
    data: {
      tour: newTour,
    },
  });
}
catch(err){
 
  res.status(400).json({
    status: "fail",
    message: "Invalid data sent",
  });
}
}
exports.singleTour = async(req, res) => {
  try{
    const { id } = req.params;
     const findTour= await Tours.findById(id) 
     res.status(200).json({
      findTour})
    }
catch(err){
  res.status(404).json({
    status: "fail",
    message: "not found",
  });
}
   

};

exports.UpdateTour = async(req, res) => {
  try{

    const { id } = req.params;
    const updateTour = await Tours.findByIdAndUpdate(id,req.body,{new:true})
  
    // console.log(tour.name=req.body.name)
    // console.log(tour)
    res.status(200).json({
      status: "sucess",
      data: {
        tour:updateTour
      },
    });
  }
  catch(err){
    res.status(404).json({
      status: "fail",
      message: "not found",
    });
  }
  }

exports.deleteTour = async(req, res) => {
  try{
    const { id } = req.params;
   const tour = await Tours.findByIdAndDelete(id)
    res.status(204).json({
      status: "sucess",
      data: tour
    });

  }
  catch(err){
    res.status(404).json({
      status: "fail",
      message: "not deleted",
    });
  
  }
};

mongoose.connect(`mongodb+srv://adalajakathan06:9tp2nSRob4r6bte8@cluster0.7ydagn2.mongodb.net/Narutos?retryWrites=true`,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology:true,
  maxIdleTimeMS:100000
 })
.then((con)=>console.log('DB connection successful'))
 .catch(err=>console.log(err));

const importData =async(req,res)=>{
  try{
     await new Tours (tours)
    console.log("data imported")
    res.json({
      status: "sucess",
      message: "data imported",
    });
  }
  catch(err){
    console.log(err)
    // res.status(404).json({
    //   status: "fail",
    //   message: "not imported",
    // });
  }
}

const deleteData =async(req,res)=>{
  try{
    await Tours.deleteMany()
    console.log("data deleted")
    // res.json({
    //   status: "sucess",
    //   message: "data deleted",
    // });
  }
  catch(err){
    console.log(err)
    // res.status(404).json({
    //   status: "fail",
    //   message: "not deleted",
    // });
  }
}
console.log(process.argv)

if(process.argv[2]==="--import"){
  importData();
}
else if(process.argv[2]==="--delete"){
  deleteData();
}

