const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
	const allUrls = await URL.find({});
	return res.status(200).render("index", { allUrls: allUrls });
});

module.exports = router;
