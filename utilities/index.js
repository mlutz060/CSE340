const invModel = require("../models/inventory-model")
const jwt = require('jsonwebtoken')
require("dotenv").config()
const Util = {}


Util.buildClassificationList = async () => {
    let data = await invModel.getClassifications();
    let menu = `<select id="classification_id" name="classification_id"> `;
    data.rows.forEach((row) => {
        menu += `<option value="${row.classification_id}">${row.classification_name}</option>`;
    });
    menu += "</select>";
    return menu;
};

Util.buildNav = function (data) {
    let list = "<ul>";
    list += '<li><a href="/" title="Home page">Home</a></li>'
    data.rows.forEach((row) => {
        list += "<li>"
        list +=
            '<a href="/inv/type/' +
            row.classification_id +
            '" title="See our inventory of ' +
            row.classification_name +
            ' vehicles">' +
            row.classification_name +
            "</a>"
        list += "</li>"
    })
    list += "</ul>"
    return list
}

Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications();
    nav = Util.buildNav(data);
    return nav;
}

Util.buildVehicle = function (data) {
    let view = "<div class='card'>"
    view += "<div class='image'><img src='"
    view += data.inv_image
    view += "'></img></div>"
    view += "<div class='details'><h1>"
    view += data.inv_year
    view += " "
    view += data.inv_make
    view += " "
    view += data.inv_model
    view += "</h1>"
    view += "<h2> $"
    view += data.inv_price
    view += "</h2><br>"
    view += "<p>"
    view += data.inv_description
    view += "</p></div></div>"
    return view;
}

Util.getVehicle = async function (req, res, next) {
    let data = await invModel.getVehicleByInvId(invId);
    inventory = Util.buildVehicle(data);
    return view;
}

Util.checkLogin = (req, res, next) => {
    if (res.locals.loggedin) {
      next()
    } else {
      next()
      // return res.redirect("")
    }
   }

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
    if (req.cookies.jwt) {
      jwt.verify(
        req.cookies.jwt,
        process.env.ACCESS_TOKEN_SECRET,
        function (err, clientData) {
          if (err) {
            res.clearCookie("jwt")
            return res.redirect("/account/login")
          }
        res.locals.clientData = clientData
        res.locals.loggedin = 1
        next()
        })
    } else {
      next()
    }
  }

/* ****************************************
 *  Authorize JWT Token
 * ************************************ */
Util.jwtAuth = (req, res, next) => {
    const token = req.cookies.jwt
    try {
        const clientData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.clientData = clientData
        res.locals.clientData = clientData
        next()
    } catch (error) {
        res.clearCookie("jwt", { httpOnly: true })
        return res.status(403).redirect("/")
    }
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util;