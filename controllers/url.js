const shortid = require("shortid");
const URL = require("../models/url");

const handelUrlPage = async (req, res) => {
	if (!req.user) return res.redirect("/login");
	const allUrls = await URL.find({ createdBy: req.user._id });
	return res.status(200).render("url", { allUrls: allUrls });
};

const handelGenertateShortId = async (req, res) => {
	const body = req.body;
	if (!body.url) return res.status(400).json({ error: "Url is required" });
	const shortId = shortid.generate(8);
	await URL.create({
		shortId,
		redirectUrl: body.url,
		visitHistory: [],
		createdBy: req.user._id,
	});
	return res.render("url", {
		shortId,
	});
};

const handelGetAnalytics = async (req, res) => {
	const { shortId } = req.params;
	const entry = await URL.findOne({ shortId });
	if (!entry) return res.status(404).json({ error: "ShortId not found" });
	return res.json({
		visitHistory: entry.visitHistory.length,
		analytics: entry.visitHistory,
	});
};

module.exports = { handelGenertateShortId, handelGetAnalytics, handelUrlPage };
