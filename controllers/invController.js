const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

const invCont = {};

invCont.buildByClassification = async function (req, res, next) {
    const classificationId = req.params.classificationId
    let data = await invModel.getVehiclesByClassificationId(classificationId)
    let nav = await utilities.getNav()
    console.log(classificationId);
    const className = data[0].classification_name 
    res.render("./inventory/classification-view", {
        title: className + "vehicles",
        //the fact that nave has no pair assumes that
        //the key and the value are identical
        nav,
        //You must supply a value even if you don't have it right way
        message: null,
        data,
    })
}

invCont.buildVehicle = async function (req, res, next){
    const invId = req.params.inv_id;
    console.log(invId);
    let nav = await utilities.getNav();
    let data = await invModel.getVehiclesByInvId(invId);
    let view = await utilities.buildVehicle(data[0]);
    res.render("./inventory/vehicle-detail", {
        title: "car",
        message: null,
        view
    })
}


module.exports = invCont;