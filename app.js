require("dotenv").config()
const express = require("express");

const app = express();
const port = 5000;

// Database connection
const connection = require("./database/db.config");

// Users middleware router file
const usersRoutes = require("./routes/users.routes");

// Questions middleware router file
const questionsRoutes = require("./routes/question.routes");
const answerRoutes = require("./routes/answer.routes");
const auth = require("./middleware/auth.middleware");

// JSON middleware
app.use(express.json());

// Users middleware
app.use("/api/users", usersRoutes);

// Questions
app.use("/api/questions", auth, questionsRoutes);

// Answers
app.use("/api/answers", auth, answerRoutes); 

(async () => {
  try {
    const result = await connection.execute("SELECT 'test'");

    await app.listen(port);
    console.log("Database connection established:)");
    console.log(`Listening on ${port}: http://localhost:${port}`);
  } catch (err) {
    console.error(err.message);
  }
})();
