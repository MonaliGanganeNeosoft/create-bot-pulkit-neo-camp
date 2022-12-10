const uuid = require("uuid");
require("dotenv").config();
const keys = process.env.NODE_KEYS_FILENAME;
const CreateorUpdateAgent = async (req, res) => {
  try {
    const { displayName } = req.body;
    const { AgentsClient } = require("@google-cloud/dialogflow");
    const projectId = process.env.NODE_PRODUCTID;
    const parent = "projects/" + projectId + "/locations/global";

    const agent = {
      parent: parent,
      displayName: displayName,
      defaultLanguageCode: "en",
      timeZone: "America/Los_Angeles",
    };

    const client = new AgentsClient({
      keyFilename: keys,
    });
    async function setAgent() {
      const request = {
        agent,
      };
      console.log(`agent created ${displayName}`);
      const [response] = await client.setAgent(request);
      res.send(`Agent created ${displayName}`);
    }
    await setAgent();
  } catch (err) {
    console.log(err);
  }
};
const GetAgent = async (req, res) => {
  try {
    const { AgentsClient } = require("@google-cloud/dialogflow");
    const projectId = process.env.NODE_PRODUCTID;
    const parent = "projects/" + projectId + "/locations/global";

    const client = new AgentsClient({
      keyFilename: keys,
    });

    async function getAgent() {
      const request = {
        parent,
      };

      const [response] = await client.getAgent(request);
      // console.log(response);

      const responseId = [];
      // response.forEach((agent) => {
      //   const NeedId = agent.name.split("/");
      //   responseId.push({
      //     Agent_Id: NeedId[4],
      //     Agent_Name: agent.displayName,
      //   });
      // });
      const NeedId = uuid.v4();
      const displayName = response.displayName;
      console.log(displayName);

      responseId.push({
        Agent_Id: NeedId[4],
        Agent_Name: displayName,
      });

      console.log("get list of agent");
      console.log(responseId);
      return res.send(responseId);
    }
    await getAgent();
  } catch (err) {
    console.log(err);
  }
};
const DeleteAgent = async (req, res) => {
  try {
    const { AgentsClient } = require("@google-cloud/dialogflow");
    const projectId = process.env.NODE_PRODUCTID;

    const parent = "projects/" + projectId + "/locations/global";

    const client = new AgentsClient({
      keyFilename: keys,
    });

    async function deleteAgent() {
      const request = {
        parent,
      };

      const [response] = await client.deleteAgent(request);
      console.log("delete agent successfully");
      res.send("delete agent successfully");
    }
    await deleteAgent();
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  CreateorUpdateAgent,
  GetAgent,
  DeleteAgent,
};
