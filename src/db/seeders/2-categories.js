const { CATEGORY_TABLE } = require('./../models/category.model');

module.exports = {
  up: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkInsert(CATEGORY_TABLE, [
      {
        name: 'Food',
        image:
          'https://www.pequerecetas.com/wp-content/uploads/2021/03/comidas-rapidas.jpg',
        created_at: new Date(),
      },
      {
        name: 'Drinks',
        image:
          'https://s1.eestatic.com/2019/04/04/ciencia/nutricion/bebidas_espirituosas-alcohol-nutricion_388473428_119607645_1706x1280.jpg',
        created_at: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkDelete(CATEGORY_TABLE, null, {});
  },
};
