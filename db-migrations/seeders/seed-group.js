const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('groups', [
      {
        id: uuidv4(),
        name: 'Admins',
        permission: Sequelize.literal(`ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']::"enum_groups_permission"[]`),
      },
      {
        id: uuidv4(),
        name: 'Guests',
        permission: Sequelize.literal(`ARRAY['READ']::"enum_groups_permission"[]`),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('groups', null, {});
  },
};
