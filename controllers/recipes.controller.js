const { Ingredient } = require("../models/ingredient");
const { sendMessage } = require("../services/openai");

const getRecipes = async (req, res) => {

    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'To get AI generated recipes'
    
    try {
        let { ingredients } = req.query;
        
        if(!ingredients) {
            res.status(404).send({msg: "No ingredients passed"})
        }

        if (!Array.isArray(ingredients)) {
            ingredients = [ingredients];
        }

        const ingredientDocs = await Ingredient.find(({_id: { $in: ingredients } }));
        const ingredientNames = ingredientDocs.map((ing) => ing.name);
        
        const generatedRecipes = await sendMessage(ingredientNames);
        res.send({recipes: generatedRecipes});
    } catch (error){
        res.status(500).send("Error. Recipe not created");
        console.log(error);
    }

}

module.exports = { getRecipes };