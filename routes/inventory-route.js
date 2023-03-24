const express = require("express"); 
const router = new express.Router(); 
const invController = require("../controllers/invController");
const validate = require('../utilities/inventory-validation');

//build inventory by classificationId
router.get("/type/:classificationId", invController.buildByClassification);
//connects classification view to a single vehicle
router.get("/detail/:inv_id", invController.buildVehicle);
//build vehicle management page
router.get("/", invController.buildVehicleManagement);

router.get("/add-classification", invController.buildNewClassification);

router.get("/add-vehicle", invController.addVehicleView);

router.get("/getVehicles/:classification_id", invController.getVehiclesJSON);

//delete route
router.get("/delete-vehicle/:inv_id", invController.getDeleteVehicle);

router.post("/delete-vehicle/:inv_id", invController.getDeleteVehicle);

router.get("/edit/:vehicle_id", invController.editVehicleView );

router.post("/add-classification",   
    validate.classificationRules(),
    validate.checkClassData(),
    invController.addClassification);

router.post("/add-vehicle", 
    validate.vehicleRules(),
    validate.checkVehicleData,
    invController.postNewVehicle);

//handle incoming update
router.post("/update/", 
validate.newVehicleRules(),
validate.checkUpdateData,
invController.updateVehicle)    

module.exports = router;