const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
require("dotenv").config();
const keys = process.env.NODE_KEYS_FILENAME;

const Connect_Dialog = async (req, res) => {
  try {
    const sessionId = uuid.v4();

    const sessionClient = new dialogflow.SessionsClient({
      keyFilename: keys,
    });
    console.log(sessionClient, "11");
    const sessionPath = sessionClient.projectAgentSessionPath(
      (projectId = process.env.NODE_PRODUCTID),
      sessionId
    );
    console.log(sessionPath, "12");
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: req.body.textData,
          languageCode: "en-US",
        },
      },
    };
    console.log(request);
    const responses = await sessionClient.detectIntent(request);
    console.log("Detected intent");
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      return res.send(`  Response: ${result.fulfillmentText}`);
    } else {
      return res.send("  No intent matched.");
    }
  } catch {
    return res.status(200).json({ status: 401, msg: "unable to connect" });
  }
};

// const CreateIntent = async (req, res) => {
//   const {
//     displayName,
//     trainingPhrasesParts,
//     outputContextArray,
//     InputContextNamesArray,
//   } = req.body;
//   const projectId = process.env.NODE_PRODUCTID;
//   try {
//     async function createIntent() {
//       const intentsClient = new dialogflow.IntentsClient({
//         keyFilename: keys,
//       });
//       const contextClient = new dialogflow.ContextsClient({
//         keyFilename: keys,
//       });
//       const agentPath = intentsClient.projectAgentPath(projectId);

//       const trainingPhrases = [];
//       const ParameterPhrases = [];
//       trainingPhrasesParts.forEach((trainingPhrasesPart) => {
//         const part = trainingPhrasesPart;
//         const trainingPhrase = {
//           type: "EXAMPLE",
//           parts: [part],
//         };

//         trainingPhrases.push(trainingPhrase);
//       });
//       ParameterPhrases.forEach((trainingPhrasesPart) => {
//         const parameter = {
//           entityTypeDisplayName: trainingPhrasesPart.entityType,
//           displayName: trainingPhrasesPart.alias,
//           value: trainingPhrasesPart.text,
//         };
//         ParameterPhrases.push(parameter);
//       });
//       const sessionId = uuid.v4();
//       const outputContexts = [];
//       outputContextArray.forEach((outputcontext) => {
//         const outputContext = {
//           name: `projects/${projectId}/agent/sessions/${sessionId}/contexts/${outputcontext.contextName}`,
//           lifespanCount: outputcontext.contextLifespan,
//         };
//         outputContexts.push(outputContext);
//       });
//       const InputContextNames = [];
//       InputContextNamesArray.forEach((inputcontextnamesarray) => {
//         const contextPath = contextClient.projectAgentSessionContextPath(
//           projectId,
//           sessionId,
//           inputcontextnamesarray
//         );
//         const inputContext = {
//           name: contextPath,
//         };
//         console.log(contextPath);
//         InputContextNames.push(contextPath);
//       });

//       const intent = {
//         displayName: displayName,
//         trainingPhrases: trainingPhrases,
//         webhookState: "WEBHOOK_STATE_ENABLED",
//         inputContextNames: InputContextNames,
//         outputContexts: outputContexts,
//       };
//       const createIntentRequest = {
//         parent: agentPath,
//         intent: intent,
//       };
//       // Create the intent
//       const response = await intentsClient.createIntent(createIntentRequest);
//       console.log(response);
//       return res.send(`Intent ${displayName} created`);
//     }
//     createIntent();
//   } catch (err) {
//     return res.send(err);
//   }
// };

const CreateIntent = async (req, res) => {
  const {
    displayName,
    trainingPhrasesParts,
    outputContextArray,
    InputContextNamesArray,
  } = req.body;
  const projectId = process.env.NODE_PRODUCTID;
  try {
    async function createIntent() {
      const intentsClient = new dialogflow.IntentsClient({
        keyFilename: keys,
      });
      const contextClient = new dialogflow.ContextsClient({
        keyFilename: keys,
      });
      const agentPath = intentsClient.projectAgentPath(projectId);

      const trainingPhrases = [];
      const ParameterPhrases = [];
      trainingPhrasesParts.forEach((trainingPhrasesPart) => {
        const part = trainingPhrasesPart;
        const trainingPhrase = {
          type: "EXAMPLE",
          parts: [part],
        };

        trainingPhrases.push(trainingPhrase);
      });
      ParameterPhrases.forEach((trainingPhrasesPart) => {
        const parameter = {
          entityTypeDisplayName: trainingPhrasesPart.entityType,
          displayName: trainingPhrasesPart.alias,
          value: trainingPhrasesPart.text,
        };
        ParameterPhrases.push(parameter);
      });
      const sessionId = uuid.v4();
      const outputContexts = [];
      outputContextArray.forEach((outputcontext) => {
        const outputContext = {
          name: `projects/${projectId}/agent/sessions/${sessionId}/contexts/${outputcontext.contextName}`,
          lifespanCount: outputcontext.contextLifespan,
        };
        outputContexts.push(outputContext);
      });
      const InputContextNames = [];
      InputContextNamesArray.forEach((inputcontextnamesarray) => {
        const contextPath = contextClient.projectAgentSessionContextPath(
          projectId,
          sessionId,
          inputcontextnamesarray
        );
        const inputContext = {
          name: contextPath,
        };
        console.log(contextPath);
        InputContextNames.push(contextPath);
      });

      const intent = {
        displayName: displayName,
        trainingPhrases: trainingPhrases,
        webhookState: "WEBHOOK_STATE_ENABLED",
        inputContextNames: InputContextNames,
        outputContexts: outputContexts,
      };
      const createIntentRequest = {
        parent: agentPath,
        intent: intent,
      };
      // Create the intent
      const response = await intentsClient.createIntent(createIntentRequest);
      console.log(response);
      return res.send(`Intent ${displayName} created`);
    }
    createIntent();
  } catch (err) {
    return res.send(err);
  }
};

const ListIntent = async (req, res) => {
  try {
    const projectId = process.env.NODE_PRODUCTID;

    // Instantiates clients
    const intentsClient = new dialogflow.IntentsClient({
      keyFilename: keys,
    });
    async function listIntents() {
      // Construct request

      // The path to identify the agent that owns the intents.
      const projectAgentPath = intentsClient.projectAgentPath(projectId);

      console.log(projectAgentPath);

      const request = {
        parent: projectAgentPath,
      };

      // Send the request for listing intents.
      const [response] = await intentsClient.listIntents(request);
      const responseId = [];
      response.forEach((intent) => {
        const NeedId = intent.name.split("/");

        responseId.push({
          Intent_Id: NeedId[4],
          Intent_Name: intent.displayName,
        });
      });
      return res.send(responseId);
    }

    listIntents();
  } catch (err) {
    return res.send(err);
  }
};
const ListTraningPhase = async (req, res) => {
  try {
    const projectId = process.env.NODE_PRODUCTID;
    const intentId = req.params.id;
    `    // const { IntentsClient } = require("@google-cloud/dialogflow");
  `;
    // Create the intents client
    // const intentClient = new IntentsClient();
    const intentsClient = new dialogflow.IntentsClient({
      keyFilename: keys,
    });
    // Specify working intent
    const intentName = `projects/${projectId}/agent/intents/${intentId}`;

    // Compose the get-intent request
    const getIntentRequest = {
      name: intentName,
      intentView: "INTENT_VIEW_FULL",
    };

    const intent = await intentsClient.getIntent(getIntentRequest);

    return res.send(intent[0].trainingPhrases);
    // [END dialogflow_list_training_phrase
  } catch (err) {
    return res.send(err);
  }
};
const UpdateIntent = async (req, res) => {
  try {
    const projectId = process.env.NODE_PRODUCTID;
    const intentId = req.params.id;
    const displayName = req.body.displayName;
    const intentClient = new dialogflow.IntentsClient({
      keyFilename: keys,
    });

    const agentPath = intentClient.projectAgentPath(projectId);
    const intentPath = agentPath + "/intents/" + intentId;

    const intent = await intentClient.getIntent({ name: intentPath });
    intent[0].displayName = displayName;
    const updateMask = {
      paths: ["display_name"],
    };
    const updateIntentRequest = {
      intent: intent[0],
      updateMask: updateMask,
      languageCode: "en",
    };
    const result = await intentClient.updateIntent(updateIntentRequest);
    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};
const DeleteIntent = async (req, res) => {
  try {
    const projectId = process.env.NODE_PRODUCTID;
    console.log(projectId);
    const intentId = req.params.id;
    console.log(intentId);
    const intentsClient = new dialogflow.IntentsClient({
      keyFilename: keys,
    });

    const intentPath = intentsClient.projectAgentIntentPath(
      projectId,
      intentId
    );

    const request = { name: intentPath };

    const result = await intentsClient.deleteIntent(request);
    return res.send(`Intent ${intentPath} deleted`);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};
module.exports = {
  Connect_Dialog,
  CreateIntent,
  ListIntent,
  ListTraningPhase,
  UpdateIntent,
  DeleteIntent,
};
