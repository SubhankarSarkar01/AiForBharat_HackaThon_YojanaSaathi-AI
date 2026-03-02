import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getAwsClients, isAwsEnabled } from "../config/awsClients.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemesDataPath = path.join(__dirname, "../data/schemes.json");

const loadLocalSchemes = () => {
  try {
    const fileData = fs.readFileSync(schemesDataPath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading local schemes data:", error.message);
    return [];
  }
};

const getSchemesTableName = () => process.env.SCHEMES_TABLE || "";
const getProfilesTableName = () => process.env.USER_PROFILES_TABLE || "";

export const getAllSchemes = async () => {
  if (isAwsEnabled() && getSchemesTableName()) {
    try {
      const clients = await getAwsClients();
      const { dynamo, commands } = clients;
      const { ScanCommand } = commands;

      const response = await dynamo.send(
        new ScanCommand({
          TableName: getSchemesTableName()
        })
      );

      if (Array.isArray(response.Items) && response.Items.length > 0) {
        return response.Items;
      }
    } catch (error) {
      console.error("DynamoDB scheme fetch failed, using local file:", error.message);
    }
  }

  return loadLocalSchemes();
};

export const searchSchemesByQuery = async (query) => {
  const allSchemes = await getAllSchemes();
  const safeQuery = (query || "").trim();

  if (!safeQuery) {
    return allSchemes;
  }

  const regex = new RegExp(safeQuery, "i");

  return allSchemes.filter((scheme) => {
    return (
      regex.test(scheme.name || "") ||
      regex.test(scheme.category || "") ||
      regex.test(scheme.description || "")
    );
  });
};

export const persistUserProfile = async (profile) => {
  if (!isAwsEnabled() || !getProfilesTableName()) {
    return null;
  }

  try {
    const clients = await getAwsClients();
    const { dynamo, commands } = clients;
    const { PutCommand } = commands;

    const now = new Date().toISOString();
    const item = {
      userId: profile.userId || `guest-${Date.now()}`,
      profileSnapshot: {
        age: profile.age,
        income: profile.income,
        category: profile.category,
        state: profile.state || ""
      },
      createdAt: now,
      updatedAt: now
    };

    await dynamo.send(
      new PutCommand({
        TableName: getProfilesTableName(),
        Item: item
      })
    );

    return item;
  } catch (error) {
    console.error("Unable to persist user profile:", error.message);
    return null;
  }
};
