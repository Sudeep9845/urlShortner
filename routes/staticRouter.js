const express = require("express");

const { handelSignUpPage, handelLoginPage } = require("../controllers/user");
const { restrictTo } = require("../middlewares/auth");
const URL = require("../models/url");

const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
	const allUrls = await URL.find({});
	return res.status(200).render("url", { allUrls: allUrls });
});

router.get("/", async (req, res) => {
	return res.status(200).render("index");
});
router.get("/signup", handelSignUpPage);
router.get("/login", handelLoginPage);

module.exports = router;
