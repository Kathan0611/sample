const express =require('express');
const tourRouter=express.Router();
const tourController=require('../Controller.js/tourController');
tourRouter.route("/").get(tourController.getAllTours).post(tourController.createTour)
  tourRouter.route("/:id")
  .get(tourController.singleTour)
  .patch(tourController.UpdateTour)
  .delete(tourController.deleteTour);

module.exports=tourRouter;