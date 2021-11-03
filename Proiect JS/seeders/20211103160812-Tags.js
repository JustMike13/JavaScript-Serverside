'use strict';

const faker = require("faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tags = []
    for(let i = 0; i < 50; i++) {
      const label = faker.lorem.words();
      tags.push({
        label,
        slug: label.replaceAll(' ', '_'),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Tags', tags, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Tags', null, {});
     
  }
};
