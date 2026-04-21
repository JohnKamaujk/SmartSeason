const express = require("express");
const router = express.Router();

const updateController = require("../controllers/update.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// Add update (Agent/Admin)
router.post("/:id/update", verifyToken, updateController.addUpdate);

// Get updates for a field
router.get("/:id/updates", verifyToken, updateController.getFieldUpdates);

module.exports = router;
