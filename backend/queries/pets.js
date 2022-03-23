const { query, pool } = require("../lib/db");
const SQL = require("@nearform/sql");
const { response } = require("express");

function getAllPets() {
  return query(SQL`SELECT * FROM pets;`);
}
exports.getAllPets = getAllPets;

async function getPetById(petId) {
  return new Promise((resolve, reject) => {
    pool.query(SQL`SELECT * FROM pets WHERE id = ${petId};`,
      (err, results) => {
        if (err) reject(err)
        else resolve(results[0])
      }
    )
  })
}
exports.getPetById = getPetById

async function adoptOrFosterPet(status, petId, userId) {
  return new Promise((resolve, reject) => {
    pool.query(SQL`UPDATE pets SET adoptionStatus = ${status}, userId = ${userId}  WHERE id = ${petId};`,
      (err, results) => {
        if (err) reject(err)
        else resolve(results[0])
      }
    )
  })
}
exports.adoptOrFosterPet = adoptOrFosterPet;

async function returnPet(petId) {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE pets SET adoptionStatus = 'Available', userId = NULL WHERE id = ?;`, [petId],
      (err, results) => {
        if (err) reject(err)
        else resolve(results[0])
      }
    )
  })
}
exports.returnPet = returnPet;

async function savePet(userId, petId) {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO savedPets (userId, petId) VALUES (?, ?);`, [userId, petId],
      (err, results) => {
        if (err) reject(err)
        else resolve(results[0])
      })
  })
}
exports.savePet = savePet;

async function deleteSavedPet(petId, userId) {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM savedPets WHERE userId = ? AND petId = ?;`, [userId, petId],
      (err, results) => {
        if (err) reject(err)
        else resolve(results[0])
      })
  })
}
exports.deleteSavedPet = deleteSavedPet;

async function getSavedPets(userId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT p.* FROM pets p JOIN savedPets sp ON sp.petId = p.id JOIN users u ON sp.userId = u.id WHERE u.id = ? GROUP BY p.id;`, [userId],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  })
}
exports.getSavedPets = getSavedPets

async function isPetSaved(userId, petId) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM savedPets WHERE userId = ? AND petId = ?`, [userId, petId],
      (err, results) => {
        if (err) reject(err)
        else {
          if (results.length === 0) resolve(false)
          else resolve(true)
        }
      })
  })
}
exports.isPetSaved = isPetSaved

async function getPetsByUserId(userId) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM pets WHERE userId = ?;`, [userId],
      (err, results) => {
        if (err) reject(err)
        else resolve(results)
      })
  })
}
exports.getPetsByUserId = getPetsByUserId;

// Search Pets
async function petSearch(query) {
  const { type, status, name, weight, height } = query
  return new Promise((resolve, reject) => {
    pool.query(
      SQL`SELECT * FROM pets WHERE (type = ${type} OR ${type} = "undefined") 
        AND (adoptionStatus = ${status} OR ${status} = "undefined")
        AND (name = ${name} OR ${name} = "undefined")
        AND (weight = ${weight} OR ${weight} = "undefined") 
        AND (height = ${height} OR ${height} = "undefined");`,
      (err, results) => {
        if (err) reject(err);
        else {
          if (results.length === 0) resolve("No Results")
          else resolve(results);
        }
      }
    );
  })
}
exports.petSearch = petSearch;