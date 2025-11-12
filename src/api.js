const express = require("express");
const cors = require("cors");
const PublicacaoRoutes = require("./routes/publicacao");

const app = express();
const port = 3000;

// ✅ Habilita CORS para qualquer origem
app.use(cors());

app.use(express.json());
app.use("/publicacao", PublicacaoRoutes);

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
