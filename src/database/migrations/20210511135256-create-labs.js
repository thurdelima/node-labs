'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('labs', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        address_id: {
            type: Sequelize.INTEGER,
            references: { model: 'addresses', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: false,
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaltValue: true,
            allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('labs');
  }
};
