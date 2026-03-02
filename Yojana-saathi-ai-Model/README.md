# YojanaSaathi AI

YojanaSaathi AI is a citizen-facing assistant that helps users discover government schemes, check basic eligibility, and ask follow-up questions in natural language.

## Tech Stack

- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express
- AI Layer: Amazon Bedrock (optional, with local fallback)
- Data: DynamoDB (optional, with local JSON fallback)

## What Is Implemented

- `GET /api/schemes` for all schemes
- `GET /api/schemes/search?q=` for keyword search
- `POST /api/recommendations` for ranked scheme recommendations
- `POST /api/chat` for AI-based scheme assistant responses
- `GET /health` to verify backend status and AWS mode

### Recommendation response now includes:

- `matchScore`
- `recommendationReasons`
- `eligibilityStatus`
- `aiSummary` (Bedrock-generated if enabled, deterministic fallback otherwise)

## Project Structure

```text
Yojana-saathi-ai-Model/
|- client/
|  |- src/
|  |  |- components/
|  |  |- pages/
|  |  |- config/api.js
|  |- .env.example
|- server/
|  |- config/awsClients.js
|  |- services/
|  |  |- bedrockService.js
|  |  |- recommendationService.js
|  |  |- schemeRepository.js
|  |- routes/api.js
|  |- controllers/schemeController.js
|  |- scripts/seedDynamo.js
|  |- data/schemes.json
|  |- .env.example
```

## Local Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
npm start
```

Backend runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`.

## AWS Configuration (Optional)

Edit `server/.env`:

```env
USE_AWS=true
AWS_REGION=ap-south-1
SCHEMES_TABLE=YojanaSchemes
USER_PROFILES_TABLE=YojanaUserProfiles
BEDROCK_MODEL_ID=amazon.nova-lite-v1:0
BEDROCK_KNOWLEDGE_BASE_ID=
BEDROCK_KB_MODEL_ARN=
```

If `USE_AWS=false`, the app still works with local `schemes.json` and deterministic AI fallback text.

## DynamoDB Seed

After setting AWS credentials and table names:

```bash
cd server
npm run seed:dynamo
```

## Suggested AWS Deployment

- Frontend: AWS Amplify
- Backend API: API Gateway + Lambda
- Data: DynamoDB
- AI: Bedrock Runtime + (optional) Bedrock Knowledge Base with S3 documents
