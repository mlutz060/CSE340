const express = require("express"); 
const router = new express.Router(); 
const invController = require("../controllers/invController");

//build inventory by classificationId
router.get("/type/:classificationId", invController.buildByClassification);
//connects classification view to a single vehicle
router.get("/detail/:inv_id", invController.buildVehicle);
//build vehicle management page
router.get("/management-view", invController.buildVehicleManagement);

router.get("/add-classification", invController.buildNewClassification);

router.get("/add-vehicle", invController.addVehicle);

router.post("/add-classification", invController.addClassification);

router.post("/add-vehicle", invController.addVehicle)

module.exports = router;