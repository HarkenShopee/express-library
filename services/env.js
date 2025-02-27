const path = require('path');
const dotenv = require('dotenv');

const loadEnv = () => {
  const envPath = path.join(
    __dirname,
    `../.env.${process.env.NODE_ENV || 'development'}`
  );
  dotenv.config({ path: envPath });
};

module.exports = loadEnv;