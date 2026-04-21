const express = require("express");
const router = express.Router();

const fieldController = require("../controllers/field.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");

// Admin creates field
router.post("/", verifyToken, allowRoles("ADMIN"), fieldController.createField);

// Get fields (Admin sees all, Agent sees assigned)
router.get("/", verifyToken, fieldController.getFields);

module.exports = router;
