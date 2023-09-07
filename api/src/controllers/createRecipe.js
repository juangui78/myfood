require("dotenv").config();
const axios = require("axios");
const {Recipe, Diet} = require("../db")


// function dietToId (diets) {
//     let newDiets = []
//     diets.map((diet) => {
//         if (diet === 'gluten free') newDiets.push(1)
//         if (diet === 'vegetarian') newDiets.push(2)
//         if (diet === 'lacto vegetarian') newDiets.push(3)
//         if (diet === 'ovo vegetarian') newDiets.push(4)
//         if (diet === 'vegan') newDiets.push(5)
//         if (diet === 'pescetarian') newDiets.push(6)
//         if (diet === 'low fodmap') newDiets.push(7)
//         if (diet === 'whole 30') newDiets.push(8)
//         if (diet === 'dairy free') newDiets.push(9)
//     })

//     return newDiets
// }

const createRecipe = async (req, res) => {
    try {
        const {title, image, summary, healthScore, steps, diets } = req.body;
        const recipe = await {title, image, summary, healthScore, steps}
        const newRecipe = await Recipe.create(recipe);

        newRecipe.addDiets(diets)
        console.log(newRecipe)
        res.status(201).json(newRecipe)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = createRecipe;