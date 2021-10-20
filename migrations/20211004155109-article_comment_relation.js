"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      {
        tableName: "Comments",
        schema: "articles",
      },
      "ArticleSlug",
      {
        type: Sequelize.STRING,
        references: {
          model: "Articles", // name of Source model
          key: "slug",
        },
        onDelete: "CASCADE",
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      {
        tableName: "Comments",
        schema: "articles",
      },
      "ArticleSlug"
    );
  },
};
