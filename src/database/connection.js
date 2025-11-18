//Conexão com o banco e importa o Pool gerenciador de conexões
const { Pool } = require("pg");

//Carrega variáveis de ambiente
require("dotenv").config();

//Configuração do Pool
const config = new Pool({
  host: "localhost",
  database: "pe_na_trilha",
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  ssl: false,
});

module.exports = config;
