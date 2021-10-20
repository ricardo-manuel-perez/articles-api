"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      { tableName: "Favourites", schema: "articles" },
      {
        userEmail: {
          type: Sequelize.STRING,
          references: {
            model: "Users",
            key: "email",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        articleSlug: {
          type: Sequelize.STRING,
          references: {
            model: "Articles",
            key: "slug",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({ tableName: "Favourites", schema: "articles" });
  },
};
