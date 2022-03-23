const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { getUserByEmail, addUser, getUserById, updateUserInfo, isEmailUnique } = require("../queries/users");
const { validation } = require("../middleware/validation");
const { createUserSchema, loginUserSchema, updateProfileSchema } = require("../schemas/userSchemas");
const { createToken, verifyToken } = require("../middleware/authorization")

const router = express.Router();

router.get("/token", verifyToken, async (req, res) => {
  const { decoded } = req.body;
  const data = await getUserById(decoded);
  res.setHeader("Content-Type", "application/json");
  res.status(200).send({ user: data });
});

// Unused
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const subStrID = userId.substring(1);
  const data = await getUserById(subStrID);
  res.setHeader("Content-Type", "application/json");
  res.status(200).send({ user: data });
});

router.post("/", validation(createUserSchema), (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    res.send("Passwords do not match");
    return;
  }
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      res.status(400).send({ error: err.message });
      return;
    }
    const user = await getUserByEmail(email);
    if (user) {
      res.status(400).send("User already exists! Please use another email address");
      return;
    }

    req.body.id = uuidv4();
    req.body.password = hash;
    await addUser(req.body);
    const token = createToken(req.body.id);
    const userToSendBack = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        tel: req.body.tel
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ user: userToSendBack, token });
  });
});

router.post("/login", validation(loginUserSchema), async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    res.status(400).send("No user found");
    return;
  }
  const match = await bcrypt.compare(password, user.password)
  if (match) {
    const token = createToken(user.id);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ user, token });
  } else {
    res.status(400).send("Incorrect Password");
    return
  }
});

router.put("/:userId", verifyToken, validation(updateProfileSchema), async (req, res) => {
  const { email, password } = req.body
  const { userId } = req.params
  const subStrID = userId.substring(1);
  
  const user = await isEmailUnique(email, subStrID);
  if (user) {
    res.status(400).send("User already exists! Please use another email address");
    return;
  } else {
    if (password.length > 5) {
      const newPassword = bcrypt.hashSync(password, 10);
      req.body.password = newPassword;
    } else {
      const currentUser = await getUserByEmail(email);
      req.body.password = currentUser.password
    }
    await updateUserInfo(req.body, subStrID);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ user: req.body });
  }

})

module.exports = router;
