import { getAwsClients, isAwsEnabled } from "../config/awsClients.js";

const RECOMMENDATION_MODEL_ID =
  process.env.BEDROCK_MODEL_ID || "amazon.nova-lite-v1:0";

const FALLBACK_AI_SUMMARY = (profile, recommendations) => {
  if (!recommendations.length) {
    return "I could not find perfect matches with the current profile. Try updating income, age, or category and re-run the recommendations.";
  }

  const top = recommendations.slice(0, 3).map((item) => item.name).join(", ");
  return `Based on age ${profile.age}, category ${profile.category}, and income Rs. ${profile.income}, the strongest matches are: ${top}.`;
};

const buildRecommendationPrompt = (profile, recommendations, language) => {
  const compactSchemes = recommendations.slice(0, 5).map((scheme) => ({
    name: scheme.name,
    category: scheme.category,
    benefits: scheme.benefits,
    matchScore: scheme.matchScore,
    reasons: scheme.recommendationReasons
  }));

  return `
You are an assistant for Indian government welfare schemes.
Explain recommendations in ${language || "English"}.
Keep language simple and practical.

Citizen profile:
- Age: ${profile.age}
- Annual income: Rs. ${profile.income}
- Category: ${profile.category}
- State: ${profile.state || "Not specified"}

Top recommendations:
${JSON.stringify(compactSchemes, null, 2)}

Return:
1) A short summary.
2) Why each top scheme is relevant.
3) Clear next action for the user.
`;
};

const invokeConverse = async (prompt) => {
  const clients = await getAwsClients();
  if (!clients) {
    return null;
  }

  const { bedrockRuntime, commands } = clients;
  const { ConverseCommand } = commands;

  const response = await bedrockRuntime.send(
    new ConverseCommand({
      modelId: RECOMMENDATION_MODEL_ID,
      system: [
        {
          text: "You are YojanaSaathi AI, an expert government scheme assistant."
        }
      ],
      messages: [
        {
          role: "user",
          content: [{ text: prompt }]
        }
      ],
      inferenceConfig: {
        maxTokens: 700,
        temperature: 0.2
      }
    })
  );

  const chunks = response?.output?.message?.content || [];
  const text = chunks
    .map((item) => item.text || "")
    .join("")
    .trim();

  return text || null;
};

const tryKnowledgeBaseAnswer = async (message) => {
  const knowledgeBaseId = process.env.BEDROCK_KNOWLEDGE_BASE_ID;
  const knowledgeBaseModelArn = process.env.BEDROCK_KB_MODEL_ARN;

  if (!knowledgeBaseId || !knowledgeBaseModelArn) {
    return null;
  }

  const clients = await getAwsClients();
  if (!clients) {
    return null;
  }

  const { bedrockAgentRuntime, commands } = clients;
  const { RetrieveAndGenerateCommand } = commands;

  const result = await bedrockAgentRuntime.send(
    new RetrieveAndGenerateCommand({
      input: { text: message },
      retrieveAndGenerateConfiguration: {
        type: "KNOWLEDGE_BASE",
        knowledgeBaseConfiguration: {
          knowledgeBaseId,
          modelArn: knowledgeBaseModelArn
        }
      }
    })
  );

  return result?.output?.text || null;
};

export const generateAiRecommendationSummary = async ({
  profile,
  recommendations,
  language
}) => {
  if (!isAwsEnabled()) {
    return FALLBACK_AI_SUMMARY(profile, recommendations);
  }

  try {
    const prompt = buildRecommendationPrompt(profile, recommendations, language);
    const answer = await invokeConverse(prompt);
    return answer || FALLBACK_AI_SUMMARY(profile, recommendations);
  } catch (error) {
    console.error("Bedrock recommendation summary failed:", error.message);
    return FALLBACK_AI_SUMMARY(profile, recommendations);
  }
};

export const generateChatAnswer = async ({
  message,
  language,
  availableSchemes
}) => {
  if (!message || !message.trim()) {
    return "Please ask a scheme-related question.";
  }

  if (!isAwsEnabled()) {
    const query = message.trim().toLowerCase();
    const terms = query
      .split(/\s+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 2);

    const localMatches = availableSchemes
      .filter((scheme) => {
        const searchable = `${scheme.name || ""} ${scheme.category || ""} ${
          scheme.description || ""
        }`.toLowerCase();

        return (
          searchable.includes(query) ||
          terms.some((term) => searchable.includes(term))
        );
      })
      .slice(0, 3);

    if (!localMatches.length) {
      return "I could not find a direct scheme match in local mode. Try asking with terms like agriculture, scholarship, pension, healthcare, or a scheme name.";
    }

    const lines = localMatches.map((scheme) => {
      return `- ${scheme.name}: ${scheme.benefits}. Deadline: ${scheme.deadline || "N/A"}`;
    });

    return `Local assistant response (${language || "English"}):\n${lines.join(
      "\n"
    )}\nNext step: open the recommendation page and enter your profile for personalized matching.`;
  }

  try {
    const kbAnswer = await tryKnowledgeBaseAnswer(message);
    if (kbAnswer) {
      return kbAnswer;
    }

    const compactSchemeContext = availableSchemes.slice(0, 10).map((scheme) => ({
      name: scheme.name,
      category: scheme.category,
      benefits: scheme.benefits,
      deadline: scheme.deadline
    }));

    const prompt = `
Answer in ${language || "English"}.
Use the following available scheme context if relevant:
${JSON.stringify(compactSchemeContext, null, 2)}

User question:
${message}

Response policy:
- Keep response short and accurate.
- If scheme details are uncertain, say so and suggest verifying on official portals.
- End with one practical next step.
`;

    const answer = await invokeConverse(prompt);
    return (
      answer ||
      "I could not generate an answer right now. Please try again in a moment."
    );
  } catch (error) {
    console.error("Bedrock chat failed:", error.message);
    return "I am unable to answer at the moment. Please try again shortly.";
  }
};
