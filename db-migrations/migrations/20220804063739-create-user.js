'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      login: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      isDeleted: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
    });

    await queryInterface.createTable('groups', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      permission: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('groups');
  },
};
