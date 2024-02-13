import Recipe from "../models/meal.js";
import axios from 'axios';

export const getMeal = async (req, res) => {
 
    const mealName = req.query.mealName;
    const APIUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}';
    
    let mealData, error = null;

    try {
        const response = await axios.get(APIUrl);
        const recipes = response.data.meals;


        for (const recipe of recipes) {
            const newRecipe = new Recipe({
                strMeal: recipe.strMeal,
                strCategory: recipe.strCategory,
                strArea: recipe.strArea,
                strInstruction: recipe.strInstructions,
                strIngredients: getIngredientsArray(recipe),
            });

            await newRecipe.save();
        }
        mealData  = await Recipe.findOne().sort({ createdAt: -1 }) || null;

        res.render("ind", { mealData, error });
        
    } catch (err) {
        error = "Error, Please try again";
        res.render("ind", { mealData: null, error });
    }
}


const getIngredientsArray = (recipe) => {
    const ingredients = [];

    for (let i = 1; i <= 5; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        
        if (ingredient && measure) {
            ingredients.push(`${measure} ${ingredient}`);

        }
    }

    return ingredients;
}