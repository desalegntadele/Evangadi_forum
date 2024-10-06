const allQuestions = function (req, res) {
  res.send('All Questions');
};


// Import necessary modules
const { StatusCodes } = require('http-status-codes');
const connection = require('../database/db.config');
const uuidv4 = require('uuid').v4;



// Create a new question
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

module.exports = { postQuestion,allQuestions};
