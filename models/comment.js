"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      body: {
        type: DataTypes.TEXT,
      },
    },
    { schema: "articles" }
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.Article);
    Comment.belongsTo(models.User);
  };
  return Comment;
};
