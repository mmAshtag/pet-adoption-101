// const addFormats = require("ajv-formats")
// addFormats(ajv, { mode: "fast", formats: "email", keywords: true })

const createUserSchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    tel: { type: "string" },
    email: { type: "string" }, // email: { format: "email" }
    password: { type: "string" },
    confirmPassword: { type: "string" },
  },
  required: ["firstName", "lastName", "email", "password", "confirmPassword"],
  additionalProperties: false,
};

const loginUserSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const updateProfileSchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    tel: { type: "string", nullable: true },
    email: { type: "string" },
    password: { type: "string" },
    bio: { type: "string", nullable: true },
  },
  required: ["password"],
};

module.exports = { createUserSchema, loginUserSchema, updateProfileSchema };
