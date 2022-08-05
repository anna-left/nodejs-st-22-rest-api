const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('groups', [
      {
        id: uuidv4(),
        name: 'Admins',
        permission: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
      },
      {
        id: uuidv4(),
        name: 'Guests',
        permission: ['READ'],
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('groups', null, {});
  },
};
