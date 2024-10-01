CREATE TABLE IF NOT EXISTS users (
   user_id INT(20) PRIMARY KEY AUTO_INCREMENT,
   username VARCHAR(255) NOT NULL UNIQUE,
   email VARCHAR(255) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255) NOT NULL

   PRIMARY KEY(user_id)
);

CREATE TABLE IF NOT EXISTS questions (
   id INT(40) PRIMARY KEY AUTO_INCREMENT,
   question_id VARCHAR(255) NOT NULL UNIQUE,
   user_id INT(20) NOT NULL,
   title VARCHAR(255) NOT NULL,
   description TEXT NOT NULL,
   tag VARCHAR(255) NOT NULL,

   FOREIGN KEY (user_id) REFERENCES users(user_id),
   PRIMARY KEY (id, question_id)
);

CREATE TABLE IF NOT EXISTS answers (
   id INT(40) PRIMARY KEY AUTO_INCREMENT,
   answer_id VARCHAR(255) NOT NULL UNIQUE,
   question_id VARCHAR(255) NOT NULL,
   user_id INT(20) NOT NULL,
   answer TEXT NOT NULL,

   FOREIGN KEY (question_id) REFERENCES questions(question_id),
   FOREIGN KEY (user_id) REFERENCES users(user_id),

   PRIMARY KEY (id, answer_id)
);
