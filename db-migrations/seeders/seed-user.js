const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        login: 'ArkadiiDobkin',
        password: 'EPAM1993',
        age: 64,
      },
      {
        id: uuidv4(),
        login: 'ElonMusk',
        password: 'Tesla2003',
        age: 650,
      },
      {
        id: uuidv4(),
        login: 'BillGates',
        password: 'Microsoft1975',
        age: 67,
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
