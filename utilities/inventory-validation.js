const utilities = require("./");
const { body, validationResult } = require("express-validator");
const inventoryModel = require("../models/inventory-model");
const validate = {};

validate.classificationRules = () => {
    return [
        body('classification_name')
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage("Enter the classification name")
    ]
}

validate.vehicleRules = () => {
    return [
        //classification_name
        body("classification_name")
        .trim()
        .escape()
        .isLength({ min:1 })
        .withMessage("Select Classification"),
        //inv_make
        body("inv_make")
        .trim()
        .escape()
        .isLength({min:1})
        .withMessage("Vehicle make is required"),
        //inv_model
        body("inv_model")
        .trim()
        .escape()
        .isLength({ min:1 })
        .withMessage("Valid model is required"),
        //inv_description
        body("inv_description")
        .trim()
        .escape()
        .isLength({ min:1 })
        .withMessage("description is required"),
        //inv_image
        body("inv_image")
        .trim()
        .escape()
        .isLength({ min:1 })
        .withMessage("Enter image Path"),
        //inv_thumbnail
        body("inv_thumbnail")
        .trim()
        .escape()
        .isLength({ min:1 })
        .withMessage("Enter Thumbnail Path"),
        //inv_price
        body("inv_price")
        .trim()
        .escape()
        .isNumeric()
        .isDecimal()
        .isLength({ min:1 })
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
        .isLength({ min:1 })
        .withMessage("Vehicle miles are required"),
        //inv_color
        body("inv_color")
        .trim()
        .escape()
        .isLength({ min:1 })
        .withMessage("Vehicle color is required"),
    ]
}

validate.checkRegData = async (req, res, next) => {
    const { classification_name } = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()){
        let nav = await utilities.getNav();
        res.render("../views/inventory/add-classification", {
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

validate.checkRegData = async (req, res, next) => {
    const { classification_name, inv_make, inv_model,
            inv_description, inv_image, inv_thumbnail,
            inv_price, inv_year, inv_miles, inv_color } = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()){
        let nav = await utilities.getNav();
        res.render("../views/inventory/add-vehicle", {
            errors,
            message: null,
            title: "Add Vehicle",
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
            inv_color            
        })
        return    
    }
    next()
}

module.exports = validate;