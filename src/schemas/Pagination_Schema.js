const Joi = require("joi");
module.exports = {
  PaginationSchema: Joi.object().keys({
    size: Joi.number().required(),
    page: Joi.number().required(),
  }),
};
