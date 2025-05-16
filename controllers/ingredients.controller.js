const { Ingredient } = require("../models/ingredient");

const createIngredient = async (req, res) => {
    //Crear un ingrediente en mi db
    try {
        const createdIngredient = new Ingredient(req.body);
        createdIngredient.save();
        res.status(201).send(createdIngredient);
    } catch (error){
        res.status(500).send("Error. Ingredient not created");
        console.log(error);
    }
}

const getIngredients = async (req, res) => {
    //Obtener todos ingredientes de un usuario
    //[{}]
    try {
        const listIngredients = await Ingredient.find();
        res.status(200).send(listIngredients);
    } catch (error) {
        res.status(500).send("Error to get ingredients");
        console.log(error);
    }
}

const updateIngredient = async (req, res) => {
    //Actualizar un ingrediente
    try {
        const idIngredient = req.params.id;
        const updatedIngredient = await Ingredient.updateOne(req.body).where({_id: idIngredient});
        res.status(200).send("Ingredient updated");
    } catch (error) {
        res.status(500).send("Error to update ingredient");
        console.log(error);
    }
}

const deleteIngredient = async (req, res) => {
    //Actualizar un ingrediente
    try {
        const idIngredient = req.params.id;
        const deletedIngredient = await Ingredient.deleteOne({_id: idIngredient});
        res.status(200).send("Ingredient deleted");
    } catch (error) {
        res.status(500).send("Error to delete ingredient")
        console.log(error);
    }
}

module.exports = { createIngredient, getIngredients, updateIngredient, deleteIngredient};

/* exports.createIngredient = createIngredient;
exports.getIngredients = getIngredients;
exports.updateIngredient = updateIngredient;
exports.deleteIngredient = deleteIngredient; */