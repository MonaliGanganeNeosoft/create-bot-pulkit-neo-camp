const express = require("express");
const {
  CreateEntity,
  listEntityTypes,
  updateEntityType,
  DeleteEntity,
} = require("../controllers/entityController");
const router = express.Router();
router.post("/createEntity", CreateEntity);
router.get("/listEntityTypes", listEntityTypes);
router.put("/updateEntityType/:id", updateEntityType);
router.delete("/deleteEntity/:id", DeleteEntity);
module.exports = router;
