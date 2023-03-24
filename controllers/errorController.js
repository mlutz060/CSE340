const invModel = require("../models/inventory-model");
const utilities = require("../utilities");
const errCont = {};

errCont.buildError = async function (req, res, next){
    let nav = await utilities.getNav();
    res.render("/errors/error", {
        title: "Error Page",
        nav,
        message: null
    })
}

module.exports = errCont;