const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/database');


const db = {};
const sequelize = new Sequelize(config);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // const model = sequelize.import(path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// const models = {
//     Address: require('./address')(sequelize, Sequelize),

//   };

//   Object.keys(models).forEach(key => {
//     if ('associate' in models[key]) {
//       models[key].associate(models);
//     }
//   });

//   module.exports = models;
