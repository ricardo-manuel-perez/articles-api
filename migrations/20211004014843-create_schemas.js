"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createSchema("articles");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropSchema("articles");
  },
};
