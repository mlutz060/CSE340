const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const Utils = require("/utilities/index.js")

//("/detail:inv_id", invController.buildVehicle);

router.get("", accountController.myAccount);

modules.export = router;
