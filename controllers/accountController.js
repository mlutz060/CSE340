const Utils = require("../utilities/");
const Model = require("../models/account-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
require("dotenv").config()
const utilities = require("../utilities/");

/* ****************************************
*  Deliver login view
**************************************** */
  async function buildLogin(req, res, next) {
    let nav = await Utils.getNav() 
    res.render("clients/login", {
      title: "Login",
      nav,
      message: null,
    })
  }

  async function buildRegister(req, res, next){
    let nav = await Utils.getNav()
    res.render("clients/register", {
      title: "Registration",
      nav,
      errors: null,
      message: null,
    })
  }

/* ****************************************
 *  Process registration request
 **************************************** */
async function registerClient(req, res) {
  let nav = await Utils.getNav()
  const { client_firstname, client_lastname, client_email, client_password } =
    req.body

    let hashedPassword
    try {
      // pass regular password and cost (salt is generated automatically)
      hashedPassword = await bcrypt.hashSync(client_password, 10)
    } catch (error) {
      res.status(500).render("clients/register", {
        title: "Registration",
        nav,
        message: 'Sorry, there was an error processing the registration.',
        errors: null,
      })
    }
  const regResult = await Model.registerClient(
    client_firstname,
    client_lastname,
    client_email,
    hashedPassword
  )
  console.log(regResult)
  if (regResult) {
    res.status(201).render("clients/login.ejs", {
      title: "Login",
      nav,
      message: `Congratulations, you\'re registered ${client_firstname}. Please log in.`,
      errors: null,
    })
  } else {
    const message = "Sorry, the registration failed."
    res.status(501).render("clients/register.ejs", {
      title: "Registration",
      nav,
      message,
      errors: null,
    })
  }
}

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { client_email, client_password } = req.body
  const clientData = await Model.getClientByEmail(client_email)
  if (!clientData) {
    const message = "Please check your credentials and try again."
    res.status(400).render("clients/login", {
      title: "Login",
      nav,
      message,
      errors: null,
      client_email,
    })
    return
  }
  try {
    if (await bcrypt.compare(client_password, clientData.client_password)) {
      console.log("compare")
      delete clientData.client_password
      const accessToken = jwt.sign(clientData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      console.log(accessToken)
      res.cookie("jwt", accessToken, { httpOnly: true })
      return res.redirect("/client/")
    }
  } catch (error) {
    return res.status(403).send('Access Forbidden')
  }
}

async function logout (req, res, next){
  let nav = await utilities.getNav();
  res.clearCookie('jwt', { httpOnly: true });
  res.redirect('/');
}


async function management(req, res, next){
  let nav = await utilities.getNav()
  res.render("clients/management.ejs", {
    title: null,
    nav,
    message: "You logged in!",
    errors: null
  })
}

  module.exports = { buildLogin, buildRegister, registerClient, accountLogin, logout, management }