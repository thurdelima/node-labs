'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('exams', {
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
        type_exam: {
            type: Sequelize.ENUM,
            values: [
                'analise clinica',
                'imagem',
            ],
                defaultValue: 'analise clinica'
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
    return queryInterface.dropTable('exams');
  }
};
