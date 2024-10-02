const express = require('express');

const allQuestions = require('../controller/question.controller');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/all-questions', allQuestions);

module.exports = router;
