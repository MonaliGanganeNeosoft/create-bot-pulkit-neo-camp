const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const agentRoutes = require("./routes/agentRoutes");
const intentRoutes = require("./routes/intentRoutes");
const entityRoutes = require("./routes/entityRoutes");
const webhookRoutes = require("./routes/webhookRoutes");
app.get("/", (req, res) => {
  console.log("work");
  res.send("working");
});
app.use("/agent", agentRoutes);
app.use("/intent", intentRoutes);
app.use("/entity", entityRoutes);
app.use("/webhook", webhookRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("server is working on 5000");
});
