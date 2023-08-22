const {Router} = require("express");
const getRecipeInfo = require("../controllers/getRecipe");
const createRecipe = require("../controllers/createRecipe");
const getRecipesByName = require("../controllers/getRecipesByName")

const router = Router();

router.get("/recipes/:idRecipe", getRecipeInfo);
router.get("/recipes", getRecipesByName);
router.post("/recipes", createRecipe);

module.exports = router;