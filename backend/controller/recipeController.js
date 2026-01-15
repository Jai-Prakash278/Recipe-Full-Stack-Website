const fs = require("fs");
const path = require("path");
const Recipes = require("../models/recipeModel");
const multer = require('multer')
const User = require("../models/userModel");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + file.fieldname
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })

exports.upload = upload

exports.getRecipe = async (req, res) => {
    try {
        const recipes = await Recipes.find();
        return res.status(200).json(recipes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipes.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        return res.status(200).json(recipe);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


exports.addRecipe = async (req, res) => {
    if (req.user.role !== "host") {
        return res.status(403).json({ message: "Only hosts can add recipes" });
    }

    const { title, ingredients, instruction, time } = req.body;

    if (!title || !ingredients || !instruction) {
        return res.status(400).json({ message: "Required fields can't be empty!" });
    }

    const newRecipe = await Recipes.create({
        title,
        ingredients,
        instruction,
        time,
        imageUrl: req.file ? req.file.filename : null,
        createdBy: req.user.id,
    });

    return res.status(201).json(newRecipe);
};


exports.editRecipe = async (req, res) => {
    try {
        const recipe = await Recipes.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        if (recipe.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const updatedData = {
            title: req.body.title,
            instruction: req.body.instruction,
            time: req.body.time,
        };

        if (req.body.ingredients) {
            updatedData.ingredients = req.body.ingredients.split(",");
        }

        if (req.file) {
            updatedData.imageUrl = req.file.filename;
        }

        const updatedRecipe = await Recipes.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.status(200).json(updatedRecipe);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error while updating recipe" });
    }
};


exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipes.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        if (recipe.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (recipe.imageUrl) {
            const imagePath = path.join(
                __dirname,
                "../public/images",
                recipe.imageUrl
            );

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Recipes.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting recipe" });
    }
};


exports.toggleFavourite = async (req, res) => {
    const userId = req.user.id;
    const recipeId = req.params.recipeId;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isFavourite = user.favourites.includes(recipeId);

    if (isFavourite) {
        user.favourites.pull(recipeId); // remove
    } else {
        user.favourites.push(recipeId); // add
    }

    await user.save();

    res.status(200).json({
        message: isFavourite
            ? "Removed from favourites"
            : "Added to favourites",
        favourites: user.favourites,
    });
};

exports.getFavourites = async (req, res) => {
    const user = await User.findById(req.user.id).populate("favourites");

    res.status(200).json(user.favourites);
};