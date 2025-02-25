const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Wiki HomePage");
});

router.get(/.*fish$/, (req, res) => {
  res.send("Fish Page");
});

module.exports = router;
