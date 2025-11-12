//Conexão com o banco
const { Pool } = require("pg");

require("dotenv").config();

const config = new Pool({
  host: "localhost",
  database: "pe_na_trilha",
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  ssl: false,
});

module.exports = config;
