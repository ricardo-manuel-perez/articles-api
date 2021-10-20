const Joi = require("joi");

const FollowSchema = Joi.object().keys({
  followedEmail: Joi.string().required(),
  followerEmail: Joi.string().required(),
});


module.exports.FollowSchema = FollowSchema;