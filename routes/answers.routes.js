const express = require("express");
const router = express.Router();

//import all the answer controllers
const { addAnswer, getAnswers } = require("../controller/answer.controller");


//answer route

router.post("/addanswer", addAnswer);

router.get("/allanswers/:questionid", getAnswers);

//export the route

module.exports = router;
