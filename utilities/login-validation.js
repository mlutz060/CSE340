const utilities = require("./");
const { body, validationResult } = require("express-validator");
const accountModel = require("../models/account-model")
const validate = {};

validate.loginRules= () => {
    return [
        //username 
        body("client_email")
        .trim()
        .escape()
        .isLength({ min: 5 })
        .withMessage("Enter your email."),
        //password
        body("client_password")
        .trim()
        .escape()
        .isLength({min: 10})
        .withMessage("Enter your password")
    ]
    
}
validate.checkLoginData = async (req, res, next) => {
    const { client_email, client_password } = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()){
        let nav = await utilities.getNav();
        res.render("../views/clients/register", {
            errors,
            message: null,
            title: "Registration",
            nav,
            client_email,
            client_password,
        })
        return
    }
    next()
}

module.exports = validate;