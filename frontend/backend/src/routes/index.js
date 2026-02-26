const express = require ("express");
const supportBotRoutes = require("./supportBt.routes");
const liveRoutes = require(".liveroutes");

const router = express.Router();

router.use("/support-bot", supportBotRoutes);
router.use("live", liveRoutes)

module.exports = router;