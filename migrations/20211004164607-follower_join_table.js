"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      {
        tableName: "Followers",
        schema: "articles",
      },
      {
        userEmail: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: "Users", // name of Source model
            key: "email",
          },
          onDelete: "CASCADE",
        },
        followerEmail: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: "Users", // name of Source model
            key: "email",
          },
          onDelete: "CASCADE",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      tableName: "Followers",
      schema: "articles",
    });
  },
};
