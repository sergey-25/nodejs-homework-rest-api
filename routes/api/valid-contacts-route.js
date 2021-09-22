const Joi = require('joi')

const schemaCreateContacts = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),

  phone: Joi.string()
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
}).or('name', 'phone', 'email')

const schemaUpdateContacts = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .optional(),

  phone: Joi.string()
    .optional(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional()
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    next({ status: 400, message: err.message.replace(/"/g, "'") })
  }
}

module.exports = {
  createContactValidation: async (req, res, next) => {
    return await validate(schemaCreateContacts, req.body, next)
  },
  updateContactValidation: async (req, res, next) => {
    return await validate(schemaUpdateContacts, req.body, next)
  }
}
