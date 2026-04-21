const getFieldStatus = (field) => {
  // 1. Completed
  if (field.currentStage === "HARVESTED") {
    return "COMPLETED";
  }

  // 2. Get last update
  const lastUpdate = field.updates?.[0];

  if (!lastUpdate) {
    return "AT_RISK";
  }

  // 3. Check time difference
  const now = new Date();
  const last = new Date(lastUpdate.createdAt);

  const diffDays = (now - last) / (1000 * 60 * 60 * 24);

  if (diffDays > 7) {
    return "AT_RISK";
  }

  return "ACTIVE";
};

module.exports = { getFieldStatus };
