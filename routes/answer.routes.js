const express = require("express");
const router = express.Router();

// Import all the answer controllers
const {
  answerForQuestion,
  postAnswer,
} = require("../controller/answer.controller");

// Answer routes
router.post("/addanswer", postAnswer);
router.get("/allanswers/:questionid", answerForQuestion);

// Export the router
module.exports = router;
