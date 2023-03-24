const utilities = require("./");
const { body, validationResult } = require("express-validator");
const inventoryModel = require("../models/inventory-model");
const validate = {};

validate.classificationRules = () => {
    return [
        body('classification_name')
        .trim()
        .escape()
        .isLength({ min: 4 })
        .withMessage("Enter the classification name")
    ]
}

validate.vehicleRules = () => {
    return [
        //classification_name
        body("classification_id")
        .trim()
        .escape()
        .isLength({ min:1 })
        .withMessage("Select Classification"),
        //inv_make
        body("inv_make")
        .trim()
        .escape()
        .isLength({min:3})
        .withMessage("Vehicle make is required"),
        //inv_model
        body("inv_model")
        .trim()
        .escape()
        .isLength({ min:3 })
        .withMessage("Valid model is required"),
        //inv_description
        body("inv_description")
        .trim()
        .escape()
        .isLength({ min:10 })
        .withMessage("description is required"),
        //inv_image
        body("inv_image")
        .trim()
        .escape()
        .isLength({ min:4 })
        .withMessage("Enter image Path"),
        //inv_thumbnail
        body("inv_thumbnail")
        .trim()
        .escape()
        .isLength({ min:4 })
        .withMessage("Enter Thumbnail Path"),
        //inv_price
        body("inv_price")
        .trim()
        .escape()
        .isNumeric()
        .isDecimal()
        .isLength({ min:3 })
        .withMessage("Price is required"),
        //inv_year
        body("inv_year")
        .trim()
        .escape()
        .isNumeric()
        .isLength({ min:4 })
        .withMessage("Vehicle year is required"),
        //inv_miles
        body("inv_miles")
        .trim()
        .escape()
        .isNumeric()
        .isLength({ min:2 })
        .withMessage("Vehicle miles are required"),
        //inv_color
        body("inv_colors")
        .trim()
        .escape()
        .isLength({ min:4 })
        .withMessage("Vehicle color is required"),
    ]
}

validate.newVehicleRules = () => {
    return [
        //classification_name
        body("classification_id")
        .trim()
        .escape()
        .isLength({ min:1 })
        .withMessage("Select Classification"),
        //inv_make
        body("inv_make")
        .trim()
        .escape()
        .isLength({min:3})
        .withMessage("Vehicle make is required"),
        //inv_model
        body("inv_model")
        .trim()
        .escape()
        .isLength({ min:3 })
        .withMessage("Valid model is required"),
        //inv_description
        body("inv_description")
        .trim()
        .escape()
        .isLength({ min:10 })
        .withMessage("description is required"),
        //inv_image
        body("inv_image")
        .trim()
        .escape()
        .isLength({ min:4 })
        .withMessage("Enter image Path"),
        //inv_thumbnail
        body("inv_thumbnail")
        .trim()
        .escape()
        .isLength({ min:4 })
        .withMessage("Enter Thumbnail Path"),
        //inv_price
        body("inv_price")
        .trim()
        .escape()
        .isNumeric()
        .isDecimal()
        .isLength({ min:3 })
        .withMessage("Price is required"),
        //inv_year
        body("inv_year")
        .trim()
        .escape()
        .isNumeric()
        .isLength({ min:4 })
        .withMessage("Vehicle year is required"),
        //inv_miles
        body("inv_miles")
        .trim()
        .escape()
        .isNumeric()
        .isLength({ min:2 })
        .withMessage("Vehicle miles are required"),
        //inv_color
        body("inv_colors")
        .trim()
        .escape()
        .isLength({ min:4 })
        .withMessage("Vehicle color is required"),
    ]
}

validate.checkClassData = async (req, res, next) => {
    const { classification_name } = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()){
        let nav = await utilities.getNav();
        res.render("inventory/add-classification", {
            errors,
            message: null,
            title: "Add Classification ",
            nav,
            classification_name,
        })
        return    
    }
    next()
} 

validate.checkVehicleData = async (req, res, next) => {
    const { classification_id, inv_make, inv_model,
            inv_description, inv_image, inv_thumbnail,
            inv_price, inv_year, inv_miles, inv_colors } = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()){
        let nav = await utilities.getNav();
        let menu = await utilities.buildClassificationList();
        res.render("inventory/add-vehicle", {
            errors,
            message: null,
            title: "Add Vehicle",
            menu,
            nav,
            classification_id,
            inv_make,
            inv_model,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_year,
            inv_miles,
            inv_colors            
        })
        return    
    }
    next()
}

validate.checkUpdateData = async (req, res, next) => {
    const { classification_id, inv_make, inv_model,
            inv_description, inv_image, inv_thumbnail,
            inv_price, inv_year, inv_miles, inv_colors, inv_id } = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()){
        let nav = await utilities.getNav();
        let menu = await utilities.buildClassificationList();
        res.render("inventory/update/", {
            errors,
            message: null,
            title: "Edit Vehicle",
            menu,
            nav,
            classification_id,
            inv_make,
            inv_model,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_year,
            inv_miles,
            inv_colors,
            inv_id            
        })
        return    
    }
    next()
}

module.exports = validate;