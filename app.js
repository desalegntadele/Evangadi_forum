require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors")
app.use(cors())
const port = 5000;
const cors = require('cors');

app.use(cors());

//database connection
const connection = require('./database/db.config');

// Questions middleware router file
const questionsRoutes = require("./routes/question.routes");
const answerRoutes = require("./routes/answer.routes");
const auth = require("./middleware/auth.middleware");

//questions middleware router file
const questionsRoutes = require('./routes/question.routes');

// answer routes middleware file
const answerRoute = require('./routes/answers.routes');

//authentication middleware router file
const auth = require('./middleware/auth.middleware');

//json middleware
app.use(express.json());

// Users middleware
app.use("/api/users", usersRoutes);

// Questions
app.use("/api/questions", auth, questionsRoutes);

// Answers
app.use("/api/answers", auth, answerRoutes); 

//answer middleware
app.use('/api/answers', auth, answerRoute);

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
