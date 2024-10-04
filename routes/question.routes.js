const express = require('express');
const router = express.Router();
// const allQuestions = require('../controller/question.controller');
// router.get('/all-questions', allQuestions);

const auth = require("../middleware/auth.middleware");
//post question code starts here 
const { postQuestion } = require("../controller/question.controller");


// Post question route
router.post("/question", auth, postQuestion);

module.exports = router;



