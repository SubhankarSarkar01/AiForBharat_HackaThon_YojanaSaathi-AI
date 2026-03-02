import {
  getAllSchemes,
  persistUserProfile,
  searchSchemesByQuery
} from "../services/schemeRepository.js";
import { recommendSchemes } from "../services/recommendationService.js";
import {
  generateAiRecommendationSummary,
  generateChatAnswer
} from "../services/bedrockService.js";

export const getSchemes = async (req, res, next) => {
  try {
    const schemes = await getAllSchemes();
    res.json({ success: true, count: schemes.length, data: schemes });
  } catch (error) {
    next(error);
  }
};

export const searchSchemes = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res
        .status(400)
        .json({ success: false, message: "Missing search query" });
    }

    const filteredSchemes = await searchSchemesByQuery(q);

    res.json({
      success: true,
      count: filteredSchemes.length,
      data: filteredSchemes
    });
  } catch (error) {
    next(error);
  }
};

export const getRecommendations = async (req, res, next) => {
  try {
    const { age, income, category, state, language, userId } = req.body;

    if (!age || !income || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide age, income, and category to get recommendations"
      });
    }

    const profile = { age, income, category, state, userId };
    const schemes = await getAllSchemes();
    const recommendations = recommendSchemes(schemes, profile);

    const aiSummary = await generateAiRecommendationSummary({
      profile,
      recommendations,
      language
    });

    await persistUserProfile(profile);

    res.json({
      success: true,
      count: recommendations.length,
      data: recommendations,
      aiSummary
    });
  } catch (error) {
    next(error);
  }
};

export const chatWithAssistant = async (req, res, next) => {
  try {
    const { message, language } = req.body;

    if (!message || !message.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a chat message" });
    }

    const schemes = await getAllSchemes();
    const answer = await generateChatAnswer({
      message,
      language,
      availableSchemes: schemes
    });

    res.json({ success: true, answer });
  } catch (error) {
    next(error);
  }
};

export const login = (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (phoneNumber && otp === "1234") {
    res.json({
      success: true,
      token: "mock-jwt-token-123",
      user: { phoneNumber }
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid OTP or phone number (Use 1234 for OTP)"
    });
  }
};
