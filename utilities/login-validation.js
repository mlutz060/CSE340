const utilities = require("./");
const { body, validationResult } = require("express-validator");
const accountModel = require("../models/account-model")
const validate = {};

validate.registrationRules= () => {
    return [
        //username 
        body("client_username")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage("Enter your username."),
        //password
        body("client_password")
        .trim()
        .escape()
        .isLength({min: 1})
        .withMessage("Enter your password")
    ]
}