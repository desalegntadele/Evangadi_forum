const connection = require("../database/db.config");
const { StatusCodes } = require("http-status-codes");
const uuidv4 = require("uuid").v4;

// Task 6: Get answers for a question
const answerForQuestion = async function (req, res) {
  const { question_id } = req.params; // Get the question_id from request parameters
  console.log("Received question_id:", question_id); // Log received question_id for debugging

  try {
    // Query the database to get answers for the specified question along with usernames
    const [answers] = await connection.query(
      `
      SELECT a.answer_id, a.answer, u.username AS user_name, a.user_id
      FROM answers a
      JOIN users u ON a.user_id = u.user_id
      WHERE a.question_id = ?;
    `,
      [question_id]
    );

    console.log("Fetched Answers:", answers); // Log fetched answers for debugging

    // Check if answers exist
    if (!answers || answers.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The requested question has no answers yet.",
      });
    }

    res.status(StatusCodes.OK).json({ answers });
  } catch (err) {
    console.error("Error fetching answers:", err); // Improved logging
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      message: "An unexpected error occurred.",
    });
  }
};



// Post an answer to a question
const postAnswer = async function (req, res) {
  const { question_id, answer } = req.body;
  const {user_id} = req.user // Assuming user_id is extracted from the authentication middleware

  // Validate answer input
  if (!answer) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide an answer.",
    });
  }

  // Check if user is authenticated
  if (!user_id) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Unauthorized",
      message: "User not authenticated.",
    });
  }

  try {
    const answer_id = uuidv4(); // Generate a unique answer_id

    await connection.query(
      `
      INSERT INTO answers (answer_id, question_id, user_id, answer)
      VALUES (?, ?, ?, ?)
    `,
      [answer_id, question_id, user_id, answer]
    );

    res.status(StatusCodes.CREATED).json({
      message: "Answer posted successfully.",
    });
  } catch (err) {
    console.error("Error posting answer:", err); // Improved logging
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      message: "An unexpected error occurred.",
    });
  }
};

// Export the functions
module.exports = { answerForQuestion, postAnswer };
