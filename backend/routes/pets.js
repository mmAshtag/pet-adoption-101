const express = require("express")
const {
  getAllPets,
  getPetById,
  adoptOrFosterPet,
  deleteSavedPet,
  returnPet,
  savePet,
  getSavedPets,
  getPetsByUserId,
  isPetSaved,
  petSearch
} = require("../queries/pets");
const { verifyToken } = require("../middleware/authorization");
// const { createPetSchema } = require("../schemas/petSchemas")
const { validation } = require("../middleware/validation")

const router = express.Router()

router.get("/search", async (req, res) => {
    const { type, status, name, weight, height } = req.query;

    const searchQuery = {
      type: type ? type : "undefined",
      status: status ? status : "undefined",
      name: name ? name : "undefined",
      weight: !weight || weight === 0 ? "undefined" : Number(weight),
      height: !height || height === 0 ? "undefined" : Number(height),
    };
    const data = await petSearch(searchQuery);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ pets: data })
})

router.get("/", verifyToken, async (req, res) => {
    const data = await getAllPets()
    res.setHeader("Content-Type", "application/json")
    res.status(200).send({ pets: data })
})

router.get("/:petId", verifyToken, async (req, res) => {
    const { petId } = req.params
    const subStrID = petId.substring(1)
    const data = await getPetById(subStrID);
    res.setHeader("Content-Type", "application/json")
    res.status(200).send({ pet: data })
})

router.get("/:userId/mypets", verifyToken, async (req, res) => {
    const { userId } = req.params
    const subStrId = userId.substring(1)
    const data = await getPetsByUserId(subStrId)
    res.setHeader("Content-Type", "application/json")
    res.status(200).send({ pets: data })
})

router.get("/:userId/saved", verifyToken, async (req, res) => {
    const { userId } = req.params
    const subStrId = userId.substring(1)
    const data = await getSavedPets(subStrId)
    res.setHeader("Content-Type", "application/json")
    res.status(200).send({ pets: data })
})

router.get("/:userId/:petId/issaved", verifyToken, async (req, res) => {
    const { userId, petId } = req.params;
    const petIdSubStr = petId.substring(1);
    const userIdSubStr = userId.substring(1);
    const data = await isPetSaved(userIdSubStr, petIdSubStr);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ data });
})

router.post("/:petId/adopt", verifyToken, async (req, res) => {
    const { petId } = req.params
    const petIdSubStr = petId.substring(1);
    const data = await adoptOrFosterPet(req.body.pet.adoptionStatus, petIdSubStr, req.body.userId);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ pet: data });
})

router.post("/:petId/return", verifyToken, async (req, res) => {
    const { petId } = req.params
    const petIdSubStr = petId.substring(1);
    const data = await returnPet(petIdSubStr);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ pet: data });
})

router.post("/:petId/save", verifyToken, async (req, res) => {
    const { petId } = req.params;
    const petIdSubStr = petId.substring(1);
    const data = await savePet(req.body.userId, petIdSubStr);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ pet: data });
})

router.delete("/:petId/:userId", verifyToken, async (req, res) => {
    const { petId, userId } = req.params;
    const petIdSubStr = petId.substring(1);
    const userIdSubStr = userId.substring(1);
    const data = await deleteSavedPet(petIdSubStr, userIdSubStr);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ pet: data });
})

module.exports = router;