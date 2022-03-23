const Ajv = require("ajv").default;
const ajv = new Ajv();

const validation = (schema) => {
    return (req, res, next) => {
        const valid = ajv.validate(schema, req.body)
        if (!valid) {
            res.status(400).send(`${ajv.errors[0].instancePath.substring(1)} ${ajv.errors[0].message}`)
            return
        }
        next()
    }
}

exports.validation = validation