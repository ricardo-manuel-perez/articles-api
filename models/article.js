"use strict";
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "Article",
    {
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { schema: "articles" }
  );
  Article.associate = function (models) {
    Article.belongsToMany(models.User, { through: models.Favourite });
    Article.hasMany(models.Comment);
  };
  return Article;
};
