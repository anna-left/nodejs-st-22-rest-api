'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
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
    await queryInterface.dropTable('groups');
  },
};
