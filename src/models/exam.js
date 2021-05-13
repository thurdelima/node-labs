let Sequelize  = require('sequelize');


module.exports = (sequelize) => {
    const Exam = sequelize.define('Exam', {
      name: Sequelize.STRING,
      type_exam: Sequelize.ENUM('analise clinica', 'imagem'),
      status: Sequelize.BOOLEAN,

    });

    return Exam;
  }


