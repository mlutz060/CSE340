const pool = require("../database")

async function getClassifications(){
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
}

async function getVehiclesByClassificationId(classificationId){
    try{
        const data = await pool.query("SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE i.classification_id = $1",
        [classificationId])
        return data.rows
    }
    catch (error) {
        console.error('getclassificationsbyid error' + error)
    }
}

async function getVehiclesByInvId(invId){
    try{
        const data = await pool.query("SELECT * FROM public.inventory WHERE inv_id = $1",
        [invId])
        return data.rows
    }
    catch (error) {
        console.error('getVehicleById error' + error)
    }
}

async function postNewVehicle(vehicleData){
    try{
        const data = await pool.query("INSERT INTO public.inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_colors)",
        [vehicleData])
    }
    catch (error){
        console.error('postVehicle error' + error)
    }
}

async function addClassification(classificationData){
    try{
        const data = await pool.query("INSERT INTO public.classification (classification_name) VALUES",
        [classificationData])
    }
    catch (error){
        console.error('postVehicle error' + error)
    }
}

module.exports = { getVehiclesByInvId, getClassifications, getVehiclesByClassificationId, postNewVehicle };