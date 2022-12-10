const express = require("express");
const { webhookintentReplay } = require("../controllers/webhookController");
const router = express.Router();
router.post("/handleWebhook", webhookintentReplay);
module.exports = router;
