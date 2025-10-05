const express = require("express");
const URL = require("../models/url");
const { handelSignUpPage, handelLoginPage } = require("../controllers/user");

const router = express.Router();

router.get("/", async (req, res) => {
	return res.status(200).render("index");
});
router.get("/signup", handelSignUpPage);
router.get("/login", handelLoginPage);

module.exports = router;
