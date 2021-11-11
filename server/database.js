const Sequelize = require('sequelize')
const initModels = require('./store/models/init-models')
require('./config/config');

var db = {}
const sequelize = new Sequelize(process.env.NAME_DATABASE, process.env.USER_DATABASE , process.env.PASSWORD_DATABASE, {
    host: process.env.DATABASE_URL,
    port: '5432',
    dialect: 'postgres',
    define: {
        freezeTableName: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    operatorsAliases: 0,
    timezone: '-05:00'
})
db = { ...initModels(sequelize) }
db.sequelize = sequelize
db.Sequelize = Sequelize
module.exports = db
