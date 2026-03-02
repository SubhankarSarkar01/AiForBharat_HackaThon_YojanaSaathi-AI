import express from 'express';
import {
  getSchemes,
  searchSchemes,
  getRecommendations,
  chatWithAssistant,
  login
} from "../controllers/schemeController.js";

const router = express.Router();

// GET all schemes
router.get('/schemes', getSchemes);

// GET search schemes
router.get('/schemes/search', searchSchemes);

// POST scheme recommendations based on user profile
router.post('/recommendations', getRecommendations);

// POST chat endpoint powered by Bedrock (or fallback)
router.post("/chat", chatWithAssistant);

// POST basic auth mock
router.post('/auth/login', login);

export default router;
