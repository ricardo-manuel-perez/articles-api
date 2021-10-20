"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      {
        tableName: "Comments",
        schema: "articles",
      },
      "EmailUser",
      {
        type: Sequelize.STRING,
        references: {
          model: "Users", // name of Source model
          key: "email",
        },
        onDelete: "CASCADE",
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      { tableName: "Comments", schema: "articles" },
      "EmailUser"
    );
  },
};
