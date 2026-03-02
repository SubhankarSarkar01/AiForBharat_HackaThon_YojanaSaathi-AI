const AWS_TRUE_VALUES = new Set(["1", "true", "yes", "on"]);

let cachedClients = null;

export const isAwsEnabled = () => {
  const rawValue = (process.env.USE_AWS || "").trim().toLowerCase();
  return AWS_TRUE_VALUES.has(rawValue);
};

export const getAwsRegion = () => process.env.AWS_REGION || "ap-south-1";

export const getAwsClients = async () => {
  if (!isAwsEnabled()) {
    return null;
  }

  if (cachedClients) {
    return cachedClients;
  }

  const region = getAwsRegion();

  const [
    dynamoDbModule,
    dynamoDbDocModule,
    bedrockRuntimeModule,
    bedrockAgentRuntimeModule
  ] = await Promise.all([
    import("@aws-sdk/client-dynamodb"),
    import("@aws-sdk/lib-dynamodb"),
    import("@aws-sdk/client-bedrock-runtime"),
    import("@aws-sdk/client-bedrock-agent-runtime")
  ]);

  const { DynamoDBClient } = dynamoDbModule;
  const {
    DynamoDBDocumentClient,
    ScanCommand,
    PutCommand
  } = dynamoDbDocModule;
  const { BedrockRuntimeClient, ConverseCommand } = bedrockRuntimeModule;
  const {
    BedrockAgentRuntimeClient,
    RetrieveAndGenerateCommand
  } = bedrockAgentRuntimeModule;

  const dynamoClient = new DynamoDBClient({ region });

  cachedClients = {
    region,
    dynamo: DynamoDBDocumentClient.from(dynamoClient),
    bedrockRuntime: new BedrockRuntimeClient({ region }),
    bedrockAgentRuntime: new BedrockAgentRuntimeClient({ region }),
    commands: {
      ScanCommand,
      PutCommand,
      ConverseCommand,
      RetrieveAndGenerateCommand
    }
  };

  return cachedClients;
};
