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
            '"title="See our inventory of ' +
            row.classification_name+
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
    let view = "<h1>${data.inv_year} ${data.inv_make} ${data.inv_model}</h1>"
    view +="<div class='image'><img>${data.image}</img></div>"
    view +="<div class='details'><h2>${data.inv_price}</h2><br>"
    view+= "<p>${data.inv_description}</p></div>"
    return view;
}

Util.getVehicle = async function(req, res, next){
    let data = await invModel.getVehicleByInvId(invId);
    inventory = Util.buildVehicle(data);
    return view;
}

Util.myAccount = function(req, res, next){
    let form = "<form action='post'>"
    form += "<label for='username'>Username:</label>"
    form += "<input require type='text' name='username' placeholder='user123abc'>"
    form += "<br>"
    form += "<label for='password'>Password:</label>"
    form += "<input require type='text' name='password' placeholder='**********'>"
    form += "<br>"
    form += "<button type='submit'>Login</button>"
    form += "<h1>No account? <span><a href='/'>Sign up</a></span></h1>"
    form += "</form>"
    return form;
}


module.exports = Util;