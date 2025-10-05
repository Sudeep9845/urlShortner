const express = require("express");
const {
	handelGenertateShortId,
	handelGetAnalytics,
	handelUrlPage,
} = require("../controllers/url");
const router = express.Router();
router.get("/", handelUrlPage);

router.post("/", handelGenertateShortId);

router.get("/analytics/:shortId", handelGetAnalytics);

module.exports = router;
