const express = require("express");
const router = express.Router();

// Create the ping function
function pingEndpoint(req, res) {
  const currentDate = new Date().toISOString();
  console.log(`[${currentDate}] Ping request received`);
  res.json({ message: "Pong!", timestamp: currentDate });
}

// Add the ping function to the router
router.get("/ping", pingEndpoint);

module.exports = router;
