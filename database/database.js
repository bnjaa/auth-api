const Sequelize = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestpamps: false,
        "createAt": "createdat",
        "updateAt": "updatedat",
        freezeTableName: true
    }
});

module.exports = db;