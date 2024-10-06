const allQuestions = function (req, res) {
  res.send('All Questions');
};


// Import necessary modules
const { StatusCodes } = require('http-status-codes');
const connection = require('../database/db.config');
const uuidv4 = require('uuid').v4;



/********************* Create a new question  *************************************/
const postQuestion = async (req, res) => {
  const { title, description, tag } = req.body;
  const user_id = req.user.user_id;

  // Validate request body
  if (!title || !description || !tag) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }

  try {
    const question_id = uuidv4(); // Generate a UUID
    // Insert the question into the database
    const query = `INSERT INTO questions (question_id,user_id, title, description, tag) VALUES (?,?,?,?,?)`;
    await connection.query(query, [
      question_id,
      user_id,
      title,
      description,
      tag,
    ]);

    // Return success response
    res.status(StatusCodes.CREATED).json({
      message: "Question created successfully",
    });
  } catch (error) {
    console.error(error.message);

    // Return internal server error response
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

/******************************** get single question *************************************/


// Get Single Question
const getSingleQuestion = async (req, res) => {
  const { question_id } = req.params;

  try {
    // Check if question exists
    const [question] = await connection.query(
      `SELECT * FROM questions WHERE question_id = ?`,
      [question_id]
    );

    // If question does not exist
    if (question.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: `Question with ID ${question_id} not found`,
      });
    }

    // Get current timestamp when the question is retrieved
    const created_at = new Date().toISOString(); // Generates the current timestamp

    // Return the question details with dynamically generated 'created_at'
    res.status(StatusCodes.OK).json({
      question: {
        question_id: question[0].question_id,
        title: question[0].title,
        content: question[0].description,
        user_id: question[0].user_id,
        created_at: created_at, // Generated timestamp
      },
    });
  } catch (error) {
    // Handle any other errors (like DB connection issues)
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

module.exports = { postQuestion, allQuestions, getSingleQuestion };



