"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define(
    "Follower",
    {
      UserEmail: { type: DataTypes.STRING },
      FollowerEmail: { type: DataTypes.STRING },
    },
    { schema: "articles" }
  );
  return Follower;
};
