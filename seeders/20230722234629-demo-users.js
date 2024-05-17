'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("users", [
//     {
//     first_name: "omer",
//     last_name: "sowmya",
//     email: "omer@sowmya.com",
//     password : "omerf999",
//     createdAt: new Date(),
//     updatedAt: new Date()
//    },
   {
    first_name: "ahmed",
    last_name: "sowmya",
    email: "omer@nfnfn.com",
    password : "omerf999",
    // created_at: new Date(),
    // updated_at: new Date(),

    // // updatedAt: new Date()
   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
