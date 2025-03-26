const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize ORM
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
});

// Test connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to MySQL Database');
    } catch (error) {
        console.error('❌ Unable to connect:', error);
    }
})();

module.exports = sequelize;
