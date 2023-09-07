require("dotenv").config()
const axios = require("axios");
const { APIKEY } = process.env;
const {Diet, Recipe} = require("../db")

const getDiets = async () => {

    try {
        const {data} = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`)
        const recipes = data.results
        // estoy usando un flat para obtener directamente todas las dietas
        // de cada receta en el mismo array
        const allTypesDiets = recipes.map(recipe => recipe.diets).flat();

        // uso un set para guardar en un objeto todas las dietas unicas
        const typeDiets = new Set();
        allTypesDiets.map((diet) => {
            typeDiets.add(diet)
        })

        //convierto el objeto en array
        const typesDiets = Array.from(typeDiets)

        return typesDiets;

    } catch (error) {
        console.log('Error en la peticion de Dietas')
        throw error;
    }
    
    
}

const mountingDiets = async (req, res) => {
    try {
        if (Diet.length < 1) {
            let typediets = await getDiets()
            
            typediets.map((diet) => {
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