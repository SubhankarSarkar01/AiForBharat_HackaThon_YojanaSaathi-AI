const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeText = (value) => (value || "").toString().trim().toLowerCase();

const normalizeCategory = (category) => {
  const normalized = normalizeText(category);

  if (!normalized) {
    return "";
  }

  return normalized.toUpperCase();
};

const scoreScheme = (scheme, profile) => {
  const age = toNumber(profile.age);
  const income = toNumber(profile.income);
  const category = normalizeCategory(profile.category);
  const state = normalizeText(profile.state);

  const eligibility = scheme.eligibility || {};
  const reasons = [];
  const blockers = [];

  let score = 100;

  if (age === null) {
    blockers.push("Age is required");
  } else if (eligibility.minAge && age < Number(eligibility.minAge)) {
    blockers.push(`Minimum age is ${eligibility.minAge}`);
    score -= 40;
  } else {
    reasons.push(`Age criteria satisfied (${age} years)`);
  }

  if (income === null) {
    blockers.push("Income is required");
  } else if (eligibility.maxIncome && income > Number(eligibility.maxIncome)) {
    blockers.push(`Income exceeds limit of Rs. ${eligibility.maxIncome}`);
    score -= 35;
  } else {
    reasons.push("Income criteria satisfied");
  }

  if (Array.isArray(eligibility.categories) && eligibility.categories.length > 0) {
    const normalizedCategories = eligibility.categories.map((item) =>
      normalizeCategory(item)
    );
    if (!normalizedCategories.includes(category)) {
      blockers.push("Category does not match scheme eligibility");
      score -= 25;
    } else {
      reasons.push(`Category matched (${profile.category})`);
    }
  }

  if (state && scheme.state && normalizeText(scheme.state) !== state) {
    blockers.push(`Available in ${scheme.state}`);
    score -= 15;
  } else if (state && scheme.state) {
    reasons.push(`State matched (${profile.state})`);
  }

  if (score < 0) {
    score = 0;
  }

  const isEligible = blockers.length === 0;
  const eligibilityStatus = isEligible ? "eligible" : "partially_eligible";

  return {
    ...scheme,
    matchScore: Math.round(score),
    eligibilityStatus,
    recommendationReasons: reasons,
    blockers
  };
};

export const recommendSchemes = (schemes, profile) => {
  const scored = schemes.map((scheme) => scoreScheme(scheme, profile));

  const eligible = scored
    .filter((scheme) => scheme.eligibilityStatus === "eligible")
    .sort((a, b) => b.matchScore - a.matchScore);

  if (eligible.length > 0) {
    return eligible;
  }

  return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
};
