"use strict";
const tableModel = { tableName: "Users", schema: "articles" };
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(tableModel, "userImageProfile", {
      type: Sequelize.INTEGER,
      references: {
        model: "ProfilePictures",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(tableModel, 'userImageProfile');
  },
};
