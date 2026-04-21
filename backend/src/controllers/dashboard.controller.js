const prisma = require("../config/prisma");
const { getFieldStatus } = require("../services/status.service");

exports.getDashboard = async (req, res) => {
  try {
    let fields;

    // 1. Get fields based on role
    if (req.user.role === "ADMIN") {
      fields = await prisma.field.findMany({
        include: {
          updates: {
            orderBy: { createdAt: "desc" },
            take: 1,
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

    // 2. Compute status counts
    let statusCounts = {
      ACTIVE: 0,
      AT_RISK: 0,
      COMPLETED: 0,
    };

    fields.forEach((field) => {
      const status = getFieldStatus(field);
      statusCounts[status]++;
    });

    // 3. Recent updates
    const recentUpdates = await prisma.fieldUpdate.findMany({
      where: req.user.role === "ADMIN" ? {} : { agentId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    res.json({
      totalFields: fields.length,
      statusBreakdown: statusCounts,
      recentUpdates,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
