'use strict';

const faker = require("faker");
const db = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allUsers = await db.User.findAll();
    const posts = []
    for(let i = 0; i < 50; i++) {
      const userId = Math.floor(Math.random() * allUsers.length-1);
      if(userId > 94){
        userId = 20;
      }
      posts.push({
        //id,
        userId: userId,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Posts', posts, {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
