const express = require("express");
const cors = require("cors");
const PublicacaoRoutes = require("./routes/publicacao");

const app = express();
const port = 3000; //definimos a porta usada

// Habilita CORS para qualquer origem acesse a API
app.use(cors());

//Habilita JSON no corpo das requisições
app.use(express.json());
//Rotas ficam sob esse caminho em routes
app.use("/publicacao", PublicacaoRoutes);

//Inicializa o servidor
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
