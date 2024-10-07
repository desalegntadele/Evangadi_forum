const mysql2 = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

//access the database
const connection = mysql2.createPool({
  host: 'localhost',
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10, // Maximum number of connections allowed
});


//connection test
// connection.execute(`select 'test'`, (err, result) => {
//   if (err) return console.error(err.message);

//   console.log(result);
// });

module.exports = connection.promise();

//  process.env.DB_PASSWORD,