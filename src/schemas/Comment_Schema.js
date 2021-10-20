const Joi = require('joi')
const CommentSchema = Joi.object().keys({
    body: Joi.string().required()
})

module.exports = CommentSchema