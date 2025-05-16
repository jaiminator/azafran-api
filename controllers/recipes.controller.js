const getRecipes = async (req, res) => {
    //Encontrar una receta a partir de los ingredientes guardados
    //Nombre - Ingredientes - Procedimiento
    res.send("Get all recipes");
}

exports.getRecipes = getRecipes;