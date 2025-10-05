const express = require("express");
const {
	handelGenertateShortId,
	handelGetAnalytics,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handelGenertateShortId);

router.get("/analytics/:shortId", handelGetAnalytics);

module.exports = router;
