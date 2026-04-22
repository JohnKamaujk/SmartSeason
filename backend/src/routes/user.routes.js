const express = require("express");
const router = express.Router();

const { getAgents } = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.get("/agents", verifyToken, getAgents);

module.exports = router;
