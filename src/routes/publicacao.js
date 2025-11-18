//Rotas
const express = require("express");
const controller = require("../controllers/publicacao.controller");

const router = express.Router();

//Definição das rotas da API

router.get("/total/:id", controller.total);

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.post("/", controller.criar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.deletar);

module.exports = router;
