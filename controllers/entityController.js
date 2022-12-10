const dialogflow = require("@google-cloud/dialogflow");
require("dotenv").config();
const keys = process.env.NODE_KEYS_FILENAME;

const EntityClient = new dialogflow.EntityTypesClient({
  keyFilename: keys,
});

const CreateEntity = async (req, res) => {
  const projectId = process.env.NODE_PRODUCTID;
  console.log(req.body);
  const { displayName, entities } = req.body;
  console.log(req.body);
  try {
    const agentPath = EntityClient.projectAgentPath(projectId);
    const entites = {
      displayName: displayName,
      kind: "KIND_MAP",
      entities: entities,
    };
    const request = {
      parent: agentPath,
      entityType: entites,
    };
    const [response] = await EntityClient.createEntityType(request);
    return res.send(response);
  } catch (err) {
    console.log("inside err");
    console.log(err);
    return res.send(err);
  }
};
const listEntityTypes = async (req, res) => {
  const projectId = process.env.NODE_PRODUCTID;

  try {
    const agentPath = EntityClient.projectAgentPath(projectId);

    const request = {
      parent: agentPath,
    };
    const [response] = await EntityClient.listEntityTypes(request);
    const responseId = [];
    response.forEach((entity) => {
      const NeedId = entity.name.split("/");

      responseId.push({
        Entity_Id: NeedId[4],
        Entity_Name: entity.displayName,
      });
    });
    console.log(responseId);
    return res.send(responseId);
  } catch (err) {
    console.log("inside err list");
    console.log(err);
    return res.send(err);
  }
};
//Not working
const updateEntityType = async (req, res) => {
  try {
    const entityClient = new dialogflow.EntityTypesClient({
      keyFilename: keys,
    });
    const projectId = process.env.NODE_PRODUCTID;
    const entityId = req.params.id;
    const projectAgentPath = entityClient.projectAgentPath(projectId);
    console.log("67", projectAgentPath);
    const request = {
      parent: projectAgentPath,
    };
    console.log(request, "68");
    const { displayName, entities } = req.body;
    const response = await entityClient.updateEntityType({
      entityType: {
        name: `projects/${projectId}/agent/entityTypes/${entityId}`,
        displayName: displayName,
        kind: "KIND_MAP",
        entities: entities,
      },
    });

    console.log("whats response ", response);
    res.send(response);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};
//not working
const DeleteEntity = async (req, res) => {
  try {
    const projectId = process.env.NODE_PRODUCTID;
    console.log(projectId);
    const entityId = req.params.id;
    console.log(entityId);
    const entityClient = new dialogflow.EntityTypesClient({
      keyFilename: keys,
    });

    // const entityPath = entityClient.projectAgentIntentPath(projectId, entityId);
    const entityPath = entityClient.projectAgentEntityTypePath(
      projectId,
      entityId
    );

    const request = { name: entityPath };

    const result = await entityClient.deleteEntityType(request);
    console.log(`Intent ${entityPath} deleted`);
    return res.send(`Intent ${entityPath} deleted`);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};
module.exports = {
  CreateEntity,
  listEntityTypes,
  updateEntityType,
  DeleteEntity,
};
