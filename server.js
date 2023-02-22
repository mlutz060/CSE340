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

/* ***********************
 * Middleware
 *************************/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
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
app.get("/", baseController.buildHome)

/*Inventory routes*/
app.use("/inv", require("./routes/inventory-route"))

/*Account Route */
app.use("/client", require("./routes/account-route"))

//Index route
// app.get("/",function(req,res){
//   res.render('index', {title: "Home"})
// })

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
