'use strict';

const tableModel = {tableName: 'ProfilePictures', schema: 'articles'};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableModel, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      filename: {
        type: Sequelize.STRING,
        unique: true
      },
      UserEmail:{
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "email",
        },
      },
      path: {
        type: Sequelize.STRING
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
  }
};