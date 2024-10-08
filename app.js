require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());

//database connection
const connection = require('./database/db.config');

//users middleware router file
const usersRoutes = require('./routes/users.routes');

//questions middleware router file
const questionsRoutes = require('./routes/question.routes');

// answer routes middleware file
const answerRoute = require('./routes/answers.routes');

//authentication middleware router file
const auth = require('./middleware/auth.middleware');

//json middleware
app.use(express.json());

//users middleware
app.use('/api/users', usersRoutes);

//Questions
app.use('/api/questions', auth, questionsRoutes);

//answer middleware
app.use('/api/answers', auth, answerRoute);

(async () => {
  try {
    const result = await connection.execute("select 'test'");

    await app.listen(port);
    console.log('Database connection established:)');
    console.log(`Listening on ${port}: http://localhost:${port}`);
  } catch (err) {
    console.error(err.message);
  }
})();
