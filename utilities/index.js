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

Util.buildInventory = function (data){
    let list = "<div>";
    

}

Util.getInventory = async function(req, res, next){
    let data = await invModel.getClassifications();
    inventory = Util.buildInventory(data);
    return inventory;
}

Util.getClassifications = 

module.exports = Util;