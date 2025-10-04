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

module.exports = { handelGenertateShortId };
