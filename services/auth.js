const jwt = require("jsonwebtoken");
const secret = "secret";

const setUser = (user) => {
	return jwt.sign({ _id: user._id, email: user.email }, secret);
};

const getUser = (token) => {
	if (!token) return null;
	try {
		return jwt.verify(token, secret);
	} catch (error) {
		return null;
	}
};

module.exports = { setUser, getUser };
