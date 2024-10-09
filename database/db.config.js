const mysql2 = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

//access the database
const connection = mysql2.createPool({
  host: 'localhost',
<<<<<<< HEAD
  user: process.env.USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
=======
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
>>>>>>> f6f6e1046f4c7df78854c99dd4531451d00301b2
  connectionLimit: 10, // Maximum number of connections allowed
});


//connection test
// connection.execute(`select 'test'`, (err, result) => {
//   if (err) return console.error(err.message);

//   console.log(result);
// });

module.exports = connection.promise();

//  process.env.DB_PASSWORD,
