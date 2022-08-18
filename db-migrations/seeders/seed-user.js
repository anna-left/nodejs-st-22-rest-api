const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    const passwords = await Promise.all([
      bcrypt.hash('EPAM1993', 5),
      bcrypt.hash('Tesla2003', 5),
      bcrypt.hash('Microsoft1975', 5),
    ])
    return queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        login: 'ArkadiiDobkin',
        password: passwords[0],
        age: 64,
      },
      {
        id: uuidv4(),
        login: 'ElonMusk',
        password: passwords[1],
        age: 65,

      },
      {
        id: uuidv4(),
        login: 'BillGates',
        password: passwords[2],
        age: 67,
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
