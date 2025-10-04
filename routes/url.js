const express = require("express")
const {handelGenertateShortId} = require("../controllers/url")
const router = express.Router()

router.post("/", handelGenertateShortId)

module.exports = router