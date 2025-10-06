const { getUser } = require("../services/auth");

const restrictToLoggedInUser = async (req, res, next) => {
	// const userUid = req.cookies?.uid;
	const userUid = req.headers["authorization"];
	console.log(req.headers);
	if (!userUid) return res.redirect("/login");
	const token = userUid.split("Bearer ")[1];
	console.log(token);
	const user = getUser(token);
	if (!user) return res.redirect("/login");
	req.user = user;
	next();
};

const checkAuth = async (req, res, next) => {
	// const userUid = req.cookies?.uid;
	const userUid = req.headers["authorization"];
	const token = userUid.split("Bearer ")[1];
	console.log(token);
	const user = getUser(token);
	req.user = user;
	next();
};
module.exports = { restrictToLoggedInUser, checkAuth };
