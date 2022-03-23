const { pool } = require("../lib/db");
const SQL = require("@nearform/sql");

async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    pool.query(SQL`SELECT * FROM users WHERE email = ${email};`,
      (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
  })
}
exports.getUserByEmail = getUserByEmail;

async function isEmailUnique(email, id) {
  return new Promise((resolve, reject) => {
    pool.query(SQL`SELECT * FROM users WHERE id != ${id} AND email = ${email};`,
      (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
  })
}
exports.isEmailUnique = isEmailUnique;

async function getUserById(id) {
  return new Promise((resolve, reject) => {
    pool.query(SQL`SELECT * FROM users WHERE id = ${id};`,
      (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
  })
}
exports.getUserById = getUserById;

function updateUserInfo(user, id) {
  return new Promise((resolve, reject) => {
    pool.query(SQL
      `UPDATE users SET
        email = ${user.email},
        firstName = ${user.firstName}, 
        lastName = ${user.lastName}, 
        tel = ${user.tel},
        password = ${user.password},
        bio = ${user.bio} WHERE id = ${id}`,
      (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      }
    );
  });
}
exports.updateUserInfo = updateUserInfo;

function addUser(user) {
  return new Promise((resolve, reject) => {
    pool.query(SQL
      `INSERT INTO users (
        id,
        email, 
        password, 
        firstName, 
        lastName, 
        tel
      ) VALUES (
          ${user.id},
          ${user.email},
          ${user.password},
          ${user.firstName},
          ${user.lastName},
          ${user.tel}
      );`,
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
}
exports.addUser = addUser;
