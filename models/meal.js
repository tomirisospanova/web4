import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const recipeDataSchema = new Schema({
    strMeal: {
        type: String,
        required: true,
    },
    strCategory: {
        type: String,
    },
    strArea: {
        type: String,
    },
    strInstruction: {
        type: String,
    },
    strIngredients: [{
        type: String,
    }],

}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeDataSchema);

export default Recipe;