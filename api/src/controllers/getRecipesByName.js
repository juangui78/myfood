require("dotenv").config();
const { APIKEY } = process.env;
const axios = require("axios");
const {Recipe, Diet} = require("../db");

const getAllRecipesAndFilter = async(req, res) => {
    try {
        const {name} = req.query;
        
        const allRecipes = [];
        
        const {data} = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`);
        const recipesAPI = await data.results.map((recipe) => {
            return {
            title: recipe.title,
            summary: recipe.summary,
            readyInMinutes: recipe.readyInMinutes,
            image: recipe.image,
            diets: recipe.diets,
            healthScore: recipe.healthScore,
            veryPopular: recipe.veryPopular,
            steps: recipe.instructions ? recipe.instructions : null
            }
        })

        console.log(recipesAPI)

        const recipesCreated = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
        
        const AllRecipesCreated = recipesCreated.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                img: recipe.img,
                resume: recipe.resume,
                hlevel: recipe.hlevel,
                steps: recipe.steps ? recipe.steps : null,
                diets: recipe.diets.map((diet) => diet.name)
            }
        })
        // Debo verificar como esta llegando el array de la API para
        // poder concatenar, las recetas locales estan dentro de un array
        allRecipes.push();
        allRecipes.push(recipesAPI);
        
        if (name) {
            let minName = name.toLowerCase();
            console.log(minName)
            let coincidences = allRecipes.filter((recipe) => {
                return recipe.title.toLowerCase().includes(minName)
            })
            if (coincidences.length > 0) res.status(200).json(coincidences)
            else res.status(404).json({message: "recipe not found"})
        }
        

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = getAllRecipesAndFilter;