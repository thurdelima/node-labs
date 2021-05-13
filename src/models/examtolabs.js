const Sequelize = require('sequelize');

const { Model } = require('sequelize');

// const Address = require('./address');


module.exports = (sequelize) => {
    // const Lab = sequelize.define('Lab', {
    //   name: Sequelize.STRING,
    //   address_id: Sequelize.INTEGER,
    //   status: Sequelize.BOOLEAN,

    // });

    class ExamToLabs extends Model {

        static associate(models) {



            ExamToLabs.belongsTo(models.Lab, { foreignKey: 'lab_id' });
            ExamToLabs.belongsTo(models.Exam, { foreignKey: 'exam_id' });
        }
      }
      ExamToLabs.init(
        {

            lab_id: Sequelize.INTEGER,
            exam_id: Sequelize.INTEGER,
        },
        {
          sequelize,
        }
      );

    // Lab.belongsTo(Address, {as: 'Address', foreignKey: 'address_id' });

    return ExamToLabs;
  }


