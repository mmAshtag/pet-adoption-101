const { pool } = require("../lib/db");
const SQL = require("@nearform/sql");

async function getAdmin(userName) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM admins WHERE userName = ?;`, [userName],
      (err, results) => {
        if (err) reject(err)
        else resolve(results[0])
      })
  })
}
exports.getAdmin = getAdmin;

async function createAdmin(admin) {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO admins (userName, hashed_password, role) VALUES (?, ?, "admin");`, [admin.userName, admin.password],
      (err, results) => {
        if (err) reject(err)
        else resolve(results[0])
      })
  })
}
exports.createAdmin = createAdmin;

async function getAllUsers() {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT id, email, firstName, lastName, tel, bio FROM users;`,
      (err, results) => {
        if (err) reject(err)
        else resolve(results)
      })
  })
}
exports.getAllUsers = getAllUsers

async function getUserWithOwnedPets(userId) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT p.*, u.firstName, u.lastName, u.email, u.tel, u.bio FROM pets p JOIN users u ON u.id = p.userId WHERE p.userId = ?;`, [userId],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    })
}
exports.getUserWithOwnedPets = getUserWithOwnedPets;

function createPet(pet) {
  return new Promise((resolve, reject) => {
    pool.query(
      SQL`INSERT INTO pets (
          id,
          type,
          name,
          adoptionStatus,
          picture,
          color,
          breed,
          height,
          weight,
          bio,
          hypoallergenic,
          dietary,
          userId
      ) VALUES (
          ${pet.id},
          ${pet.type},
          ${pet.name},
          ${pet.adoptionStatus},
          ${pet.picture},
          ${pet.color},
          ${pet.breed},
          ${pet.height},
          ${pet.weight},
          ${pet.bio},
          ${pet.hypoallergenic},
          ${pet.dietary},
          NULL
        );`,
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
}
exports.createPet = createPet;

function updatePet(pet) {
  return new Promise((resolve, reject) => {
    pool.query(SQL`UPDATE pets SET
          type = ${pet.type},
          name = ${pet.name},
          adoptionStatus = ${pet.adoptionStatus},
          picture = ${pet.picture},
          color = ${pet.color},
          breed = ${pet.breed},
          height = ${pet.height},
          weight = ${pet.weight},
          bio = ${pet.bio},
          hypoallergenic = ${pet.hypoallergenic},
          dietary = ${pet.dietary} WHERE id = ${pet.id};`,
      (err, results) => {
        if (err) reject(err)
        else resolve(results[0])
      });
  })
}
exports.updatePet = updatePet

async function getPetPic(petId) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT picture FROM pets WHERE id = '${petId}';`,
      (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    })
}
exports.getPetPic = getPetPic;