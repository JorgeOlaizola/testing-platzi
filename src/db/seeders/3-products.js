const { PRODUCT_TABLE } = require('./../models/product.model');

module.exports = {
  up: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkInsert(PRODUCT_TABLE, [
      {
        name: 'Hamburguesa',
        image:
          'https://www.pequerecetas.com/wp-content/uploads/2013/07/hamburguesas-caseras-receta.jpg',
        description: 'Chicken burger',
        price: 100,
        category_id: 1,
        created_at: new Date(),
      },
      {
        name: 'Papas fritas',
        image:
          'https://www.paulinacocina.net/wp-content/uploads/2017/10/frenchfries.jpg',
        description: 'Fries',
        price: 185,
        category_id: 1,
        created_at: new Date(),
      },
      {
        name: 'Captain Morgan',
        image:
          'https://acdn.mitiendanube.com/stores/001/664/228/products/capitan-morgan-dorado-700ml-rayuela-bebidas1-890ae4baf9e300665916261963732605-240-0.jpg',
        description: 'Rum',
        price: 120,
        category_id: 2,
        created_at: new Date(),
      },
      {
        name: 'Smirnoff',
        image:
          'https://www.craftmoments.com.ar/wp-content/uploads/2022/12/Botella_2-1.png',
        description: 'Vodka',
        price: 300,
        category_id: 2,
        created_at: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
  },
};
