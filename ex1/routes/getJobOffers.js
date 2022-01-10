const express = require("express");

const router = express.Router();

const getJobOffersCtrl = require("../controllers/getJobOffers");

router.get("/:company", getJobOffersCtrl.getJobOffers);
router.get("*", getJobOffersCtrl.missingCompany);

module.exports = router;
