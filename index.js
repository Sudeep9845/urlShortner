const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const URL = require("./models/url");
const { connectToDatabase } = require("./connection");

const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const urlRouter = require("./routes/url");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRouter);

app.get("/:shortId", async (req, res) => {
	const { shortId } = req.params;
	const entry = await URL.findOneAndUpdate(
		{
			shortId,
		},
		{
			$push: {
				visitHistory: {
					timeStamp: new Date().getTime(),
				},
			},
		}
	);
	if (!entry) {
		return res.status(404);
	}
	res.status(200).redirect(entry.redirectUrl);
});

//Connection to database
connectToDatabase("mongodb://172.24.96.1:27017/urlShortner")
	.then(() => console.log("Connected to database"))
	.catch((err) => console.log("Error connecting to database", err));

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
