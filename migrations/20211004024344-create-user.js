"use strict";
let tableModel = { schema: "articles", tableName: "Users" };

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableModel, {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(tableModel);
  },
};
