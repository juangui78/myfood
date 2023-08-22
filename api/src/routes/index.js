const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getRecipes = require('./Recipe')
const getDiets = require("./Diet")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", getRecipes)
router.use("/", getDiets)


module.exports = router;
