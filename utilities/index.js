const invModel = require("../models/inventory-model")
const Util = {}


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
    nav= Util.buildNav(data);
    return nav;
}

Util.buildVehicle = function (data){
        let view ="<div class='vehicleContainer'>"
        view += "<div class='image'><img src='"
        view +=data.inv_image
        view +="'></img></div>"
        view += "<div class='details'><h1>"
        view +=data.inv_year 
        view += " "
        view +=data.inv_make 
        view += " "
        view +=data.inv_model
        view +="</h1>"
        view +="<h2> $"
        view +=data.inv_price
        view +="</h2><br>"
        view+= "<p>"
        view +=data.inv_description
        view += "</p></div></div>"
    return view;
}

Util.getVehicle = async function(req, res, next){
    let data = await invModel.getVehicleByInvId(invId);
    inventory = Util.buildVehicle(data);
    return view;
}


module.exports = Util;