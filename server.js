/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const bodyParser = require("body-parser");
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const env = require("dotenv").config();
const baseController = require("./controllers/baseController");
const app = express();
const cookieParser = require("cookie-parser");
const utilities = require("./utilities/index")
/* ***********************
 * Middleware
 *************************/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(cookieParser())
app.use(utilities.checkJWTToken)
// for parsing application/x-www-form-urlencoded

/* ***********************
 * View Engine and Templates
 *************************/
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/layout'); //not at views root


/* ***********************
 * Routes
 *************************/
app.use(require("./routes/static"))
app.get("/", utilities.checkLogin, utilities.handleErrors(baseController.buildHome))

/*Inventory routes*/
app.use("/inv", require("./routes/inventory-route"))

/*Account Route */
app.use("/client", require("./routes/account-route"))

/*Error Route*/
app.use("/error", require("./routes/error-route"))

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message } else { message = 'Oh no! You broke the page! Try a different route'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message, 
    nav
  })
})


/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on http://${host}:${port}`)
})
