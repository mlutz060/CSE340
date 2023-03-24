const invModel = require("../models/inventory-model");
const utilities = require("../utilities");
const invCont = {};

invCont.buildByClassification = async function (req, res, next) {
    const classificationId = req.params.classificationId
    let data = await invModel.getVehiclesByClassificationId(classificationId)
    let nav = await utilities.getNav()
    const className = data[0].classificationId;
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
        res.status(501).render("inventory/vehicle-management.ejs", {
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
    const classificationSelect = await utilities.buildClassificationList()
    res.render("inventory/vehicle-management.ejs",{
        title: "Vehicle Management",
        nav,
        classificationSelect,
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

/* ***************************
 *  Return Vehicles by Classification As JSON
 * ************************** */
invCont.getVehiclesJSON = async (req, res, next) => {
    const classification_id = parseInt(req.params.classification_id)
    const vehicleData = await invModel.getVehiclesByClassificationId(classification_id)
    if (vehicleData[0].inv_id) {
      return res.json(vehicleData)
    } else {
      next(new Error("No data returned"))
    }
  }

/* ***************************
 *  Build edit vehicle view
 * ************************** */
invCont.editVehicleView = async function (req, res, next) {
    const inv_id = parseInt(req.params.inv_id)
    let nav = await utilities.getNav()
    const vehicleData = await invModel.getVehicleById(inv_id)
    const menu = await utilities.buildClassificationList(vehicleData.classification_id)
    const vehicleName = `${vehicleData.inv_make} ${vehicleData.inv_model}`
    res.render("./inventory/edit-vehicle", {
      title: "Edit " + vehicleName,
      nav,
      menu: menu,
      message: null,
      errors: null,
      inv_id: vehicleData.inv_id,
      inv_make: vehicleData.inv_make,
      inv_model: vehicleData.inv_model,
      inv_year: vehicleData.inv_year,
      inv_description: vehicleData.inv_description,
      inv_image: vehicleData.inv_image,
      inv_thumbnail: vehicleData.inv_thumbnail,
      inv_price: vehicleData.inv_price,
      inv_miles: vehicleData.inv_miles,
      inv_color: vehicleData.inv_color,
      classification_id: vehicleData.classification_id
    })
  }

/* ***************************
 *  Update Vehicle Data
 * ************************** */
invCont.updateVehicle = async function (req, res, next) {
    let nav = await utilities.getNav()
    const {
      inv_id, inv_make, inv_model, inv_description,
      inv_image, inv_thumbnail, inv_price, inv_year,
      inv_miles, inv_color, classification_id,
    } = req.body
    const updateResult = await invModel.updateVehicle(
      inv_id, inv_make, inv_model, inv_description,
      inv_image, inv_thumbnail, inv_price,
      inv_year, inv_miles, inv_color, classification_id
    )
  
    if (updateResult) {
      const vehicleName = updateResult.inv_make + " " + updateResult.inv_model
      res.status(201).render("inventory/management", {
        title: "Vehicle Management",
        nav,
        message: `The ${vehicleName} was successfully updated.`,
        errors: null,
      })
    } else {
      const inv_id = inv_id
      const classificationSelect = await utilities.buildClassificationList(classification_id)
      const vehicleName = `${inv_make} ${inv_model}`
      res.status(501).render("inventory/edit-vehicle", {
      title: "Edit " + vehicleName,
      nav,
      classificationSelect: classificationSelect,
      message: "Sorry, the insert failed.",
      errors: null,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
      })
    }
  }

module.exports = invCont;