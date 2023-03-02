const invModel = require("../models/inventory-model");
const utilities = require("../utilities");
const invCont = {};

invCont.buildByClassification = async function (req, res, next) {
    const classificationId = req.params.classificationId
    let data = await invModel.getVehiclesByClassificationId(classificationId)
    let nav = await utilities.getNav()
    console.log(classificationId);
    const className = data[0].classification_name 
    res.render("../views/inventory/classification-view", {
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
    res.render("../views/inventory/vehicle-detail", {
        title: "Car",
        message: null,
        view
    })
}

invCont.addClassificationView = async function (req, res, next){
    let nav = await utilities.getNav();
    res.render("inv/add-classification.ejs", {
        title: `Add New Classification`,
        nav,
        message: null,
      });
}

invCont.addClassification = async function (req, res, next){
    let nav = await utilities.getNav();
    const { classification_name } = req.body;
    let data = await invModel.postNewClassification(classification_name)
    res.render("../views/inventory/add-classification.ejs",{
        title: "Add Classification",
        message: null,
    })
}

invCont.addVehicleView = async function (req, res, next){
    let nav = await utilities.getNav();
    let menu = await invModel.getClassifications();
    res.render("../views/inventory/add-vehicle.ejs",{
        title: "Add Vehicle",
        nav,
        menu,
        message: null
    });
}

invCont.buildNewClassification = async function (req, res, next){
    let nav = await utilities.getNav();
    res.render("../views/inventory/add-classification.ejs", {
        title: null,
        message: null,
    })
}

invCont.buildVehicleManagement = async function(req,res, next){
    let nav = await utilities.getNav();
    res.render("../views/inventory/vehicle-management.ejs",{
        title: "Vehicle Management",
        message: null
    })
}

invCont.postNewVehicle = async function (req, res, next){
    let nav = await utilities.getNav();
    res.render("../views/inventory/add-vehicle.ejs",{
        title: "Add Vehicle",
        message: null
    })
    const { inv_make, inv_model, inv_year, 
        inv_description, inv_image, inv_thumbnail,
        inv_price, inv_miles, inv_colors, classification_id} = req.body

    const regResults = await invModel.postNewVehicle(inv_make, inv_model, 
        inv_year, inv_description, inv_image, inv_thumbnail, inv_price, 
        inv_miles, inv_colors, classification_id)
    if (regResults){
        res.status(201).render("../views/inventory/management-view", {
            title: "Vehicle Management",
            nav,
            message: `Congrats you added a ${inv_make, inv_model} vehicle`,
            errors: null
        })
    } else {
        const message = "Sorry registration failed"
        res.status(501).render("../view/inventory/management-view", {
            title: "Vehicle Management",
            nav,
            message: `Congrats you added a ${inv_make, inv_model} vehicle`,
            errors: null
        })
    }
}

module.exports = invCont;