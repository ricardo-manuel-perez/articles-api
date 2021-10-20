const Joi = require("joi");
const ArticleSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string(),
  body: Joi.string().required(),
  email: Joi.string().email().required(),
});

const ArticleCommentSchema = Joi.object().keys({
  articleSlug: Joi.string().required(),
  email: Joi.string().required(),
  commentBody: Joi.string().required(),
});

module.exports = ArticleSchema;
module.exports.ArticleCommentSchema = ArticleCommentSchema;
