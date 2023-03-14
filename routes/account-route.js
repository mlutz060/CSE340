const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')
const loginValidate = require('../utilities/login-validation')

router.get("/login", accountController.buildLogin);
router.get("/register", accountController.buildRegister)
// Process the registration data
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    accountController.registerClient
  )
// Process the login attempt
router.post(
    "/login",
    loginValidate.loginRules(),
    loginValidate.checkLoginData,
    accountController.accountLogin
  )

// default route for clients 
router.get("/", 
  utilities.checkJWTToken, 
  utilities.jwtAuth, 
  utilities.checkLogin, 
  accountController.management
)

router.get("/logout",
accountController.logout)

module.exports = router;
