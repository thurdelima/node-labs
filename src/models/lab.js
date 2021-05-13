const Sequelize = require('sequelize');

const { Model } = require('sequelize');

// const Address = require('./address');


module.exports = (sequelize) => {
    // const Lab = sequelize.define('Lab', {
    //   name: Sequelize.STRING,
    //   address_id: Sequelize.INTEGER,
    //   status: Sequelize.BOOLEAN,

    // });

    class Lab extends Model {

        static associate(models) {

          Lab.belongsTo(models.Address, { foreignKey: 'address_id' });
        }
      }
      Lab.init(
        {
            name: Sequelize.STRING,
            address_id: Sequelize.INTEGER,
            status: Sequelize.BOOLEAN,
        },
        {
          sequelize,
        }
      );

    // Lab.belongsTo(Address, {as: 'Address', foreignKey: 'address_id' });

    return Lab;
  }


