"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define(
    "Favourite",
    {
      UserEmail: { type: DataTypes.STRING },
      ArticleSlug: { type: DataTypes.STRING },
    },
    { schema: "articles" }
  );
  return Favourite;
};
