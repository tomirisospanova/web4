import express from 'express'
import { getMeal } from '../controllers/mealController.js';

const router = express.Router();
router.get("/", getMeal)

export default router