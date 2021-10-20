"use strict";
let tableModel = { schema: "articles", tableName: "Comments" };
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableModel, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      body: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(tableModel);
  },
};
