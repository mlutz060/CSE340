const utilities = require("../utilities");
const baseController = {};

baseController.buildHome = async function (req, res) {
    const nav = await utilities.getNav()
    res.render("index", { title: "Home", nav})
}

// baseController.buildInventory = async function(res, req){
//     const inventory = await utilities.getInventory()
//     res.render("index", {title: "Inventory", inventory})
// }

module.exports = baseController;