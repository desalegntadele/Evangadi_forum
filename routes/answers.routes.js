const express = require("express");
const router = express.Router();

//import all the answer controllers
const { postAnswer, answerForQuestion } = require("../controller/answer.controller");
  

const auth = require("../middleware/auth.middleware");

//answer route

router.post("/addanswer",auth, postAnswer);

router.get("/:questionid",auth, answerForQuestion);

//export the route

module.exports = router;

