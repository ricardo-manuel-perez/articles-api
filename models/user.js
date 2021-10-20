"use strict";
const { Model } = require("sequelize");
const favourite = require("./favourite");
const follower = require("./follower");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      userImageProfile: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    { schema: "articles" }
  );
  User.associate = function (models) {
    User.hasOne(models.ProfilePicture);
    User.hasMany(models.Article, {
      onDelete: "CASCADE",
    });
    User.hasMany(models.Comment, {
      onDelete: "CASCADE",
    });
    User.belongsToMany(models.User, {
      through: models.Follower,
      as: "Followers",
    });
    User.belongsToMany(models.Article, {
      through: models.Favourite,
    });
  };
  return User;
};
