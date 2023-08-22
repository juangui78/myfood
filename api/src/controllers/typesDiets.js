const {Diet, Recipe} = require("../db")

const typesDiets = ["gluten free", "vegetarian", "lacto vegetarian", "ovo vegetarian", 
"vegan", "pescetarian", "low fodmap", "whole 30", "dairy free"]

const mountingDiets = async (req, res) => {
    try {
        if (Diet.length < 1) {
            typesDiets.map((diet) => {
                Diet.findOrCreate({
                    where: {name: diet}
                })
            })

            const showDiets = await Diet.findAll();
            res.status(200).json(showDiets)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = mountingDiets;