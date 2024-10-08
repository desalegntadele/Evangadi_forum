const mysql2 = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

//access the database
const connection = mysql2.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10, // Maximum number of connections allowed
});

//connection test
// connection.execute(`select 'test'`, (err, result) => {
//   if (err) return console.error(err.message);

//   console.log(result);
// });

module.exports = connection.promise();

//  process.env.DB_PASSWORD,
