const connection = require("../database/db.config");
const { StatusCodes } = require("http-status-codes");

// get answers from the database
const addAnswer = async (req, res) => {
  const { questionid, userid, answer } = req.body;

  try {
    await connection.query(
      `INSERT INTO answers (question_id, user_id, answer) VALUES (?, ?, ?) `,
      [questionid, userid, answer]
    );

    return res.status(StatusCodes.CREATED).json({ msg: "answer added successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again" });
  }
};

async function getAnswers(req, res) {
  try {
    console.log(req);
    const { questionid } = req.params;

    const [answers] = await connection.query(
      `SELECT answers.answer, users.username FROM answers INNER JOIN users ON answers.user_id = users.user_id
            WHERE answers.question_id = ?`,
      [questionid]
    );

    // Send the retrieved answers as a JSON response
    res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong while fetching answers" });
  }
}

module.exports = { addAnswer, getAnswers };
