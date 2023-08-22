const {Router} = require("express");
const mountingDiets = require("../controllers/typesDiets");

const router = Router();

router.get("/diets", mountingDiets);

module.exports = router;