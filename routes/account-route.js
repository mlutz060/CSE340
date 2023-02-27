const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const Utils = require("../utilities/")
const regValidate = require('../utilities/account-validation')

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
    
    (req, res) => {
      res.status(200).send('login process')
    }
  )
module.exports = router;
