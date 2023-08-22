require("dotenv").config();
const axios = require("axios");
const URL = "http://localhost:3001/";
const { APIKEY } = process.env;
const {Recipe, Diet} = require("../db");

const getRecipeInfo = async (req, res) => {
  try {
    const { idRecipe } = req.params;
    intID = parseInt(idRecipe);
    if (
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
        idRecipe
      )
    ) {
      const localRecipe = await Recipe.findByPk(idRecipe, {
        include: {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: []
          }
        }
      })

      res.status(200).json(localRecipe)
    } else {
        const { data } = await axios.get(
            `https://api.spoonacular.com/recipes/${intID}/information?apiKey=${APIKEY}`
        );
        const info = {
            title: data.title,
            summary: data.summary,
            readyInMinutes: data.readyInMinutes,
            image: data.image,
            diets: data.diets,
            healthScore: data.healthScore,
            veryPopular: data.veryPopular,
            steps: data.instructions ? data.instructions : null,
        };
        
        res.status(200).json(info);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = getRecipeInfo;
