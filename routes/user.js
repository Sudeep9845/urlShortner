const express = require("express");
const {
	handelSignup,
	handelLogin,
	handelLogout,
} = require("../controllers/user");
const router = express.Router();

router.post("/signup", handelSignup);

router.post("/login", handelLogin);

router.get("/logout", handelLogout);

module.exports = router;
