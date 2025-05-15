const express = require("express");
const router = express.Router();

const ingredientsController = require("../controllers/ingredients.controller");

router.post("/", ingredientsController.createIngredient);
router.get("/", ingredientsController.getIngredients);
router.patch("/:id", ingredientsController.updateIngredient);
router.delete("/:id", ingredientsController.deleteIngredient);


module.exports = router;