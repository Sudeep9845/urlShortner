const express = require("express");

const URL = require("./models/url");
const { connectToDatabase } = require("./connection");

const urlRouter = require("./routes/url");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.status(200).send("Hello, world!");
});

app.use("/url", urlRouter);

//Connection to database
connectToDatabase("mongodb://172.24.96.1:27017/urlShortner")
	.then(() => console.log("Connected to database"))
	.catch((err) => console.log("Error connecting to database", err));

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
