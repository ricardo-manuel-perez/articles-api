const Joi = require("joi");
const UserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string(),
  bio: Joi.string(),
});

const UserEmail = Joi.object().keys({
  email: Joi.string().email().required(),
});

const UpdateUser = Joi.object().keys({
    email: Joi.string().email().required(),
    username: Joi.string(),
    bio: Joi.string()
})

const LoginUser = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string()
})

module.exports = UserSchema;
module.exports.UserEmail = UserEmail;
module.exports.UpdateUser = UpdateUser;
module.exports.LoginUser = LoginUser;
