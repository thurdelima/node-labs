let Sequelize  = require('sequelize');


module.exports = (sequelize) => {
    const Address = sequelize.define('Address', {
      postal_code: Sequelize.STRING,
      city: Sequelize.STRING,
      neighborhood: Sequelize.STRING,
      address: Sequelize.STRING,
      uf: Sequelize.STRING,
      complement: Sequelize.STRING,

    });

    return Address;
  }


