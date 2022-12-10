const express = require("express");
const {
  Connect_Dialog,
  CreateIntent,
  ListIntent,
  ListTraningPhase,
  UpdateIntent,
  DeleteIntent,
} = require("../controllers/intentController");
const router = express.Router();
router.post("/text", Connect_Dialog);
router.post("/createIntent", CreateIntent);
router.get("/listIntents", ListIntent);
router.get("/listTraningPhase/:id", ListTraningPhase);
router.put("/updateIntent/:id", UpdateIntent);
router.delete("/deleteIntent/:id", DeleteIntent);

module.exports = router;
