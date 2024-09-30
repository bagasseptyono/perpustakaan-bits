const ErrHandler = require("../utils/error.util")

class Validator {
    static validate (schema) {
        return function (req, _, next) {
            try {
                const { error, _ } = schema.validate(req.body)
                if (error) {
                    throw new ErrHandler(400, error.message.replace(/"/g, ''))
                }

                next()
            } catch (error) {
                next(error)
            }
        }
    }
}

module.exports = Validator