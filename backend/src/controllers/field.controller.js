const prisma = require("../config/prisma");
const { getFieldStatus } = require("../services/status.service");

exports.createField = async (req, res) => {
  try {
    const { name, cropType, plantingDate, assignedAgentId } = req.body;

    const field = await prisma.field.create({
      data: {
        name,
        cropType,
        plantingDate: new Date(plantingDate),
        currentStage: "PLANTED",
        assignedAgentId,
      },
    });

    res.status(201).json(field);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFields = async (req, res) => {
  try {
    let fields;

    if (req.user.role === "ADMIN") {
      fields = await prisma.field.findMany({
        include: {
          assignedAgent: true,
          updates: {
            orderBy: { createdAt: "desc" },
            take: 1, // only latest update
          },
        },
      });
    } else {
      fields = await prisma.field.findMany({
        where: { assignedAgentId: req.user.id },
        include: {
          updates: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      });
    }

    // 🔥 Attach computed status
    const fieldsWithStatus = fields.map((field) => ({
      ...field,
      status: getFieldStatus(field),
    }));

    res.json(fieldsWithStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
