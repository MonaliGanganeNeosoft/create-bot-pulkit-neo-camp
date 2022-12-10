const express = require("express");
const {
  CreateorUpdateAgent,
  GetAgent,
  DeleteAgent,
} = require("../controllers/agentController");
const router = express.Router();
router.post("/createorUpdateAgent", CreateorUpdateAgent);
router.get("/getAgent", GetAgent);
router.delete("/deleteAgent/:id", DeleteAgent);

module.exports = router;
