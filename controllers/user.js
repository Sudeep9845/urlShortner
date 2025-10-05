const USER = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setId } = require("../services/auth");
const handelSignUpPage = (req, res) => {
	return res.render("signup");
};

const handelSignup = async (req, res) => {
	const { username, email, password, fullName } = req.body;
	const existingUser = await USER.findOne({ email });
	if (existingUser) return res.redirect("/login");
	const user = await USER.create({
		username,
		email,
		password,
		fullName,
	});
	const sessionId = uuidv4();
	setId(sessionId, user);
	res.cookie("uid", sessionId);
	return res.redirect("/url");
};

const handelLoginPage = (req, res) => {
	return res.render("login");
};

const handelLogin = async (req, res) => {
	const { password, email } = req.body;
	const user = await USER.findOne({ email: email, password: password});
	if (!user) return res.render("login", { error: "Invalid Credentials" });
	const sessionId = uuidv4();
	setId(sessionId, user);
	res.cookie("uid", sessionId);
	return res.redirect("/url");
};

const handelLogout = (req, res) => {
	res.clearCookie("uid");
	return res.redirect("/");
};

module.exports = {
	handelSignUpPage,
	handelLoginPage,
	handelSignup,
	handelLogin,
	handelLogout,
};
