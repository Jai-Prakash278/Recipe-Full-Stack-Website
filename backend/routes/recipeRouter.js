const express = require('express');
const recipeRouter = express.Router();
const recipeController = require("../controller/recipeController");
const verifyToken = require('../middleware/auth');

recipeRouter.post(
    "/favourite/:recipeId",
    verifyToken,
    recipeController.toggleFavourite
);
recipeRouter.get(
    "/favourites",
    verifyToken,
    recipeController.getFavourites
);
recipeRouter.get('/', recipeController.getRecipe);
recipeRouter.get('/:id', recipeController.getRecipeById);
recipeRouter.post(
    '/',
    verifyToken,
    recipeController.upload.single('file'),
    recipeController.addRecipe
);
recipeRouter.put(
    '/:id',
    verifyToken,
    recipeController.upload.single('file'),
    recipeController.editRecipe
);
recipeRouter.delete(
    '/:id',
    verifyToken,
    recipeController.deleteRecipe
);


module.exports = recipeRouter;