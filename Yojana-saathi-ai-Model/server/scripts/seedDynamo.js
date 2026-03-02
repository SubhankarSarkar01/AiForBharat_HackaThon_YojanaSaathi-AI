import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getAwsClients } from "../config/awsClients.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemesPath = path.join(__dirname, "../data/schemes.json");
const schemesTableName = process.env.SCHEMES_TABLE;

const run = async () => {
  if (!schemesTableName) {
    console.error("SCHEMES_TABLE is required to seed DynamoDB.");
    process.exit(1);
  }

  const fileData = fs.readFileSync(schemesPath, "utf8");
  const schemes = JSON.parse(fileData);

  const clients = await getAwsClients();
  if (!clients) {
    console.error(
      "AWS clients are unavailable. Set USE_AWS=true and AWS credentials first."
    );
    process.exit(1);
  }

  const { dynamo, commands } = clients;
  const { PutCommand } = commands;

  for (const scheme of schemes) {
    await dynamo.send(
      new PutCommand({
        TableName: schemesTableName,
        Item: scheme
      })
    );
  }

  console.log(`Seeded ${schemes.length} schemes into ${schemesTableName}.`);
};

run().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
