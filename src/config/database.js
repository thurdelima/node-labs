require('dotenv/config');

let host_prod = 'isilo.db.elephantsql.com';
let user_prod = 'ctbdxbhl';
let password_prod = 'h7FDhQhHI3C7WHzmDJ0w7YMVNyp9lAW6';
let database_prod = 'ctbdxbhl';



module.exports = {
    dialect: 'postgres',
    host: host_prod,
    username: user_prod,
    password: password_prod,
    database: database_prod,
    operadorAliases: false,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  };


//CONFIG TO TEST LOCAL
//   dialect: 'postgres',
//     host: process.env.DB_HOST,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     operadorAliases: false,
//     define: {
//       timestamps: true,
//       underscored: true,
//       underscoredAll: true
//     }
