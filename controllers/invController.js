const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

const invCont = {};

invCont.buildByClassification = async function (req, res, next) {
    const classificationId = req.params.classificationId
    let data = await invModel.getVehiclesByClassificationId(classificationId)
    let nav = await utilities.getNav()
    console.log(classification_id);
    const className = data[0].classification_name 
    res.render("./inventory/classification-view", {
        title: className + "vehicles",
        nav,
        message: null,
        data,
    })
}

// invCont.processRequest = asyn function (req, res, next) {
//     const requestId = req.params.requestId;

// }

module.exports = invCont;