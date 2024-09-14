const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    RABBITMQ_URL: process.env.RABBITMQ_URL,
}