const pool = require("../database/index.js")

async function getClassifications(){
    return await pool.query(
        "SELECT * FROM public.classification ORDER BY classification_name");
}

async function getVehiclesByClassificationId(classificationId){
    try{
        const data = await pool.query("SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE i.classification_id = $1",
        [classificationId]);
        return data.rows;
    } catch (error) {
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

async function postNewClassification(classification_name){
    try{
        const data = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *";
        return await pool.query(data, [classification_name]);
    } catch (error){
        return error.message;
    }
}

async function postNewVehicle(classification_id, 
    inv_make, inv_model, inv_year,
     inv_description, inv_image, inv_thumbnail, 
     inv_price, inv_miles, inv_colors){
    try{
        const sql = "INSERT INTO public.inventory (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_colors) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"
        return await pool.query( sql, 
        [classification_id, inv_make, 
            inv_model, inv_year, 
            inv_description, inv_image, 
            inv_thumbnail, inv_price, inv_miles, inv_colors])
    }
    catch (error){
        return error.message
    }
}

module.exports = { getVehiclesByInvId, getClassifications, postNewClassification, getVehiclesByClassificationId, postNewVehicle };