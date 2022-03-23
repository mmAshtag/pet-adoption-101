const mysql = require("mysql2");
const Postgrator = require("postgrator");
const path = require("path");

const postgrator = new Postgrator({
  migrationDirectory: path.resolve(__dirname, "../migrations"),
  driver: "mysql2",
  host: "localhost",
  port: 3306,
  database: "petadoption",
  username: "root",
  password: process.env.MYSQL_DB_PASSWORD,
  schemaTable: "migrations",
});
exports.postgrator = postgrator;

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "petadoption",
  user: "root",
  password: process.env.MYSQL_DB_PASSWORD
});
exports.pool = pool;

function query(sqlQuery) {
  return new Promise((resolve, reject) => {
    pool.query(sqlQuery, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

exports.query = query;
