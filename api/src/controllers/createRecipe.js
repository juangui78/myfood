require("dotenv").config();
const axios = require("axios");
const {Recipe, Diet} = require("../db")

const createRecipe = async (req, res) => {
    try {
        const {title, img, resume, hlevel, steps, diets } = req.body;
        const recipe = await {title, img, resume, hlevel, steps}
        const newRecipe = await Recipe.create(recipe);

        newRecipe.addDiets(diets)

        res.status(201).json(newRecipe)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = createRecipe;