const express = require("express"); 
const router = new express.Router(); 
const invController = require("../controllers/invController");

//build inventory by classificationId
router.get("/type/:classificationId", invController.buildByClassification);
//connects classification view to a single vehicle
router.get("/detail:inv_id", invController.buildVehicle);

module.exports = router;