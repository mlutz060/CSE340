const express = require("express");
const router = new express.Router();
const errorController = require("../controllers/errorController");
const utilities = require("../utilities/")


router.get("/error", errorController.buildError);

module.exports = router;
