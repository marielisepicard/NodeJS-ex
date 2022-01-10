const express = require("express");

const router = express.Router();

const wrongUrlCtrl = require("../controllers/wrongUrl");

router.get("*", wrongUrlCtrl.wrongUrl);

module.exports = router;
