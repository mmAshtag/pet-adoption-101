
const createPetSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    adoptionStatus: { type: "string" },
    name: { type: "string" },
    color: { type: "string" },
    breed: { type: "string" },
    height: { type: "string" },
    weight: { type: "string" },
    bio: { type: "string" },
    hypoallergenic: { type: "string", oneOf: [{ const: "false" }, { const: "true" }] },
    dietary: { type: "string" },
  },
  required: [
    "type",
    "adoptionStatus",
    "name",
    "color",
    "breed",
    "hypoallergenic",
  ],
  additionalProperties: true,
};

const editPetSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    adoptionStatus: { type: "string" },
    name: { type: "string" },
    color: { type: "string" },
    breed: { type: "string" },
    height: { type: "string" },
    weight: { type: "string" },
    bio: { type: "string" },
    hypoallergenic: { type: "string", nullable: true, oneOf: [{ const: "false" }, { const: "true" }] },
    dietary: { type: "string" },
  },
  required: [
    "type",
    "adoptionStatus",
    "name",
    "color",
    "breed",
    "hypoallergenic",
  ],
  additionalProperties: true,
};

module.exports = { createPetSchema, editPetSchema }