"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      { tableName: "Articles", schema: "articles" },
      "UserEmail",
      {
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "email",
        },
        onDelete: "CASCADE",
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn({tableName: "Articles",schema:"articles"},"UserEmail")
  },
};
