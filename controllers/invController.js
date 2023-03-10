const invModel = require("../models/inventory-model");
const utilities = require("../utilities");
const invCont = {};

invCont.buildByClassification = async function (req, res, next) {
    const classificationId = req.params.classificationId
    let data = await invModel.getVehiclesByClassificationId(classificationId)
    let nav = await utilities.getNav()
    const className = data[0].classification_name;
    res.render("inventory/classification-view", {
        title: className + " " + "Vehicles",
        //the fact that nave has no pair assumes that
        //the key and the value are identical
        nav,
        //You must supply a value even if you don't have it right way
        message: null,
        data,
    });
};

invCont.buildVehicle = async function (req, res, next){
    const invId = req.params.inv_id;
    let nav = await utilities.getNav();
    let data = await invModel.getVehiclesByInvId(invId);
    let view = await utilities.buildVehicle(data[0]);
    const vehicleName = data[0].inv_year + ' ' + data[0].inv_make + ' '+ data[0].inv_model;
    res.render("inventory/vehicle-detail", {
        title: vehicleName,
        nav,
        message: null,
        data,
        view
    })
}

invCont.addClassificationView = async function (req, res, next){
    let nav = await utilities.getNav();
    res.render("inventory/add-classification.ejs", {
        title: `Add New Classification`,
        nav,
        message: null,
      });
}

invCont.addClassification = async function (req, res, next){
    let nav = await utilities.getNav();
    const { classification_name } = req.body;
    const addClassResult = await invModel.postNewClassification(classification_name);
    if (addClassResult){
        res.status(201).render("inventory/vehicle-management.ejs", {
            title: "Vehicle Management",
            nav,
            message: `The ${classification_name} classification was successfully added`,
            errors: null,
        });
    } else{
        const message = "Sorry the addition of the new class failed";
        res.status(501).render("/inventory/add-classification.ejs", {
            title: "Add New Classification",
            nav,
            message,
            errors: null,
        });
    }
};

invCont.addVehicleView = async function (req, res, next) {
    let nav = await utilities.getNav();
    let menu = await utilities.buildClassificationList();
    res.render("inventory/add-vehicle.ejs", {
      title: `Add New Vehicle`,
      nav,
      menu,
      errors: null,
      message: null,
    });
  };

invCont.buildNewClassification = async function (req, res, next){
    let nav = await utilities.getNav();
    res.render("inventory/add-classification.ejs", {
        title: null,
        nav,
        errors: null, 
        message: null,
    })
}

invCont.buildVehicleManagement = async function(req,res, next){
    let nav = await utilities.getNav();
    res.render("inventory/vehicle-management.ejs",{
        title: "Vehicle Management",
        message: null
    })
}

invCont.postNewVehicle = async function (req, res, next){
    let nav = await utilities.getNav();
    let menu = await utilities.buildClassificationList();
    const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_colors} = req.body
        console.log( classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_colors )
    const addVehicleResults = await invModel.postNewVehicle(
        classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_colors
    );   
    if (addVehicleResults){
        res.status(201).render("inventory/vehicle-management.ejs", {
            title: "Vehicle Management",
            nav,
            message: `Congrats you added a ${inv_make} ${inv_model}`,
            errors: null
        })
    } else {
        const message = "Sorry registration failed"
        res.status(501).render("inventory/vehicle-management.ejs", {
            title: "Vehicle Management",
            nav,
            message,
            errors: null
        })
    }
}

module.exports = invCont;