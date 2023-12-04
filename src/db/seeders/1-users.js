const { USER_TABLE } = require('./../models/user.model');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkInsert(USER_TABLE, [
      {
        role: 'admin',
        password: await bcrypt.hash('admin123', 10),
        email: 'admin@mail.com',
        created_at: new Date(),
      },
      {
        role: 'customer',
        password: await bcrypt.hash('customer123', 10),
        email: 'customer@mail.com',
        created_at: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkDelete(USER_TABLE, null, {});
  },
};
