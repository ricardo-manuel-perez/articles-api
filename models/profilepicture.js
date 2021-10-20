"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const ProfilePicture = sequelize.define(
    "ProfilePicture",
    {
      filename: DataTypes.STRING,
      path: DataTypes.STRING,
    },
    { schema: "articles" }
  );
  ProfilePicture.associate = function (models) {
    ProfilePicture.belongsTo(models.User);
  };
  return ProfilePicture;
};
