const prisma = require("../config/prisma");

exports.getAgents = async (req, res) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const agents = await prisma.user.findMany({
      where: { role: "AGENT" },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
