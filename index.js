const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send('Hello, world!')
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})