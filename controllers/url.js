const shortid = require("shortid");
const URL = require("../models/url");

const handelGenertateShortId = async (req, res) => {
	const body = req.body;
	if (!body.url) return res.status(400).json({ error: "Url is required" });
	const shortId = shortid.generate(8);
	await URL.create({
		shortId,
		redirectUrl: body.url,
		visitHistory: [],
	});
	return res.json({ id: shortId, url: body.url });
};

const handelGetAnalytics = async (req, res) => {
    const { shortId } = req.params
    const entry = await URL.findOne({ shortId })
    if (!entry) return res.status(404).json({ error: "ShortId not found" })
    return res.json({visitHistory:entry.visitHistory.length, analytics:entry.visitHistory})
}

module.exports = { handelGenertateShortId,handelGetAnalytics };
