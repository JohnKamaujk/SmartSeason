const prisma = require("../config/prisma");

exports.addUpdate = async (req, res) => {
  try {
    const { stage, notes } = req.body;
    const { id: fieldId } = req.params;

    // 1. Check if field exists
    const field = await prisma.field.findUnique({
      where: { id: fieldId },
    });

    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    // 2. Ensure agent owns this field
    if (req.user.role === "AGENT" && field.assignedAgentId !== req.user.id) {
      return res.status(403).json({ message: "Not your field" });
    }

    // 3. Create update
    const update = await prisma.fieldUpdate.create({
      data: {
        fieldId,
        agentId: req.user.id,
        stage,
        notes,
      },
    });

    // 4. Update field stage if provided
    if (stage) {
      await prisma.field.update({
        where: { id: fieldId },
        data: { currentStage: stage },
      });
    }

    res.status(201).json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFieldUpdates = async (req, res) => {
  try {
    const { id: fieldId } = req.params;

    const updates = await prisma.fieldUpdate.findMany({
      where: { fieldId },
      orderBy: { createdAt: "desc" },
    });

    res.json(updates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};