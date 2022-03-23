const express = require("express");
const fs = require("fs")
const bcrypt = require("bcrypt");
const { upload } = require("../middleware/mutipart");
const { v4: uuidv4 } = require("uuid");
const { validation } = require("../middleware/validation");
const { /* adminSchema */ createPetSchema, editPetSchema } = require("../schemas/adminSchemas");
const { getAllUsers, getUserWithOwnedPets, getAdmin, createAdmin, createPet, updatePet, getPetPic } = require("../queries/admin")
const { getAllPets, getPetById } = require("../queries/pets")
const { createAdminToken, verifyAdminToken } = require("../middleware/adminAuth");
const { uploadToCloudinary } = require("../lib/cloudinary");

const router = express.Router();

//Pls use Insomnia/Postman to create an admin for yourself => localhost:5050/admin/register
//Fields: Username, password, confirmPassword
router.post("/register", (req, res) => {
  const { userName, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    res.send("Passwords do not match");
    return;
  }
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      res.status(400).send({ error: err.message });
      return;
    }
    const user = await getAdmin(userName);
    if (user) {
      res.status(400).send("Admin already exists! Please use another username");
      return;
    }
    req.body.password = hash;
    await createAdmin(req.body);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ status: "Admin Created", adminInfo: { userName, password: hash } });
  });
});

router.post("/login", /* input validation */ async (req, res) => {
  const { userName, password } = req.body;
  
  const admin = await getAdmin(userName);
  if (!admin) {
    res.status(400).send("No admin found");
    return;
  }

  const match = await bcrypt.compare(password, admin.hashed_password);
  if (!match) {
    res.status(400).send("Incorrect Password");
    return;
  }
  const adminToken = createAdminToken(admin.userName);
  res.setHeader("Content-Type", "application/json");
  res.status(200).send({ admin, adminToken });
});

router.get("/token", verifyAdminToken, async (req, res) => {
  const { decoded } = req.body;
  const data = await getAdmin(decoded);
  res.setHeader("Content-Type", "application/json");
  res.status(200).send({ admin: data });
});

router.get("/users", verifyAdminToken, async (req, res) => {
    const data = await getAllUsers()
    res.setHeader("Content-Type", "application/json")
    res.status(200).send({ users: data })
})

router.get("/pets", verifyAdminToken, async (req, res) => {
    const data = await getAllPets()
    res.setHeader("Content-Type", "application/json")
    res.status(200).send({ pets: data })
})

router.get("/:petId", verifyAdminToken, async (req, res) => {
    const { petId } = req.params
    const subStrID = petId.substring(1)
    const data = await getPetById(subStrID);
    res.setHeader("Content-Type", "application/json")
    res.status(200).send({ pet: data })
})

router.get("/:userId/full", verifyAdminToken, async (req, res) => {
  const { userId } = req.params;
  const subStrID = userId.substring(1);
  const data = await getUserWithOwnedPets(subStrID);
  res.setHeader("Content-Type", "application/json");
  res.status(200).send({ data });
});

router.post("/addpet", upload.single("file"), validation(createPetSchema), verifyAdminToken, async (req, res) => {
    req.body.id = uuidv4();
    // const fileUrl = encodeURI(process.env.HOST + "/" + req.file.path);
    const uploaded = await uploadToCloudinary(req.file.path)
    fs.unlinkSync(req.file.path)
    const cloudFile = uploaded.secure_url;
    const newPet = {
      id: req.body.id,
      type: req.body.type,
      adoptionStatus: req.body.adoptionStatus,
      name: req.body.name,
      picture: cloudFile,
      color: req.body.color,
      breed: req.body.breed,
      height: req.body.height,
      weight: req.body.weight,
      bio: req.body.bio,
      hypoallergenic: req.body.hypoallergenic === "false" ? 0 : 1,
      dietary: req.body.dietary === undefined ? "None" : `${req.body.dietary}`
    }
    const data = await createPet(newPet)
    res.setHeader("Content-Type", "multipart/form-data")
    res.status(200).send({ pets: data })
})

router.put("/:petId/editpet", upload.single("file"), validation(editPetSchema), verifyAdminToken, async (req, res) => {
    const { petId } = req.params;
    const subStrId = petId.substring(1);
    const prevPic = await getPetPic(subStrId);

    let fileUrl
    if (req.file) { fileUrl = encodeURI(process.env.HOST + "/" + req.file.path) }

    const updatedPet = {
      id: subStrId,
      type: req.body.type,
      adoptionStatus: req.body.adoptionStatus,
      name: req.body.name,
      picture: req.file ? fileUrl : prevPic.picture,
      color: req.body.color,
      breed: req.body.breed,
      height: req.body.height,
      weight: req.body.weight,
      bio: req.body.bio,
      hypoallergenic: req.body.hypoallergenic === "false" ? 0 : 1,
      dietary: req.body.dietary === undefined ? "None" : `${req.body.dietary}`,
    };
    const data = await updatePet(updatedPet)
    res.setHeader("Content-Type", "multipart/form-data")
    res.status(200).send({ pets: data })
})

module.exports = router