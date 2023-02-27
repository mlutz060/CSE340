const utilities = require("./");
const { body, validationResult } = require("express-validator");
const accountModel = require("../models/account-model")
const validate = {};

validate.loginRules= () => {
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
validate.checkRegData = async (req, res, next) => {
    const { client_username, client_password } = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()){
        let nav = await utilities.getNav();
        res.render("../views/clients/register", {
            errors,
            message: null,
            title: "Registration",
            nav,
            client_username,
            client_password,
        })
        return
    }
    next()
}

module.exports = validate;