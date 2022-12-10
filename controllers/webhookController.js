const fulfillment = require("dialogflow-fulfillment");
const webhookintentReplay = (request, response) => {
  const tag = request.body.queryResult.intent.displayName;
  const agent = new fulfillment.WebhookClient({
    request,
    response,
  });
  let jsonResponse = {};
  console.log("dsjnvdsvn");
  if (tag === "Default Welcome Intent") {
    console.log("dsjkbjsdf");

    jsonResponse = {
      fulfillment_messages: [
        {
          text: {
            text: ["Hello from a testing Webhook checking start"],
          },
        },
      ],
    };
  } else if (tag === "get-name") {
    jsonResponse = {
      fulfillment_messages: [
        {
          text: {
            text: ["My name is Webhook checking for intent testing get-name"],
          },
        },
      ],
    };
  } else if (tag === "cars") {
    const response = request.body.queryResult.parameters;
    // const tex = response.Cars;
    jsonResponse = {
      fulfillment_messages: [
        {
          text: {
            //fulfillment text response to be sent to the agent
            text: ["yes we have many cars"],
          },
        },
      ],
    };
  } else if (tag === "meet") {
    jsonResponse = {
      fulfillment_messages: [
        {
          text: {
            text: [`can i get your name`],
          },
        },
      ],
    };
  } else if (tag === "askemail") {
    const name = agent.getContext("awaiting_name").parameters.person[0].name;
    console.log(name);
    jsonResponse = {
      fulfillment_messages: [
        {
          text: {
            text: [`hii ${name} can you pls share mail id`],
          },
        },
      ],
    };
  } else if (tag === "emailcheck") {
    const name = agent.getContext("awaiting_name").parameters.person[0].name;
    console.log(name);
    const email = agent.getContext("awaiting_email").parameters.email;

    jsonResponse = {
      fulfillment_messages: [
        {
          text: {
            text: [`hii ${name} inside the ${email} email check`],
          },
        },
      ],
    };
  } else {
    jsonResponse = {
      fulfillment_messages: [
        {
          text: {
            text: [
              `There are no fulfillment responses defined for "${tag}"" tag`,
            ],
          },
        },
      ],
    };
  }

  response.send(jsonResponse);
};
module.exports = { webhookintentReplay };
