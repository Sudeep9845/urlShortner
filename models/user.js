const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		fullName: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: "NORMAL",
			required: true,
		}
		
	},
	{ timestamps: true }
);

const USER = mongoose.model("User",userSchema);

module.exports = USER;
