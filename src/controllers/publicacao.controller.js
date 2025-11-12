const DAO = require("../DAO/publicacaoDAO");

class PublicacaoController {
  async listar(req, res) {
    try {
      const rows = await DAO.listAll();
      res.json(rows);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const id = parseInt(req.params.id);
      const row = await DAO.getById(id);
      if (!row)
        return res.status(404).json({ error: "Publicação não encontrada" });
      res.json(row);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async criar(req, res) {
    try {
      const post = req.body;
      const created = await DAO.create(post);
      res.status(201).json(created);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async atualizar(req, res) {
    try {
      const id = parseInt(req.params.id);
      const updated = await DAO.update(id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async total(req, res) {
    try {
      const idUsuario = req.params.id;
      const total = await DAO.totalPostsByUser(idUsuario);
      res.json({ total });
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar total de posts" });
    }
  }

  async deletar(req, res) {
    try {
      const id = parseInt(req.params.id);
      const removed = await DAO.remove(id);
      res.json(removed);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new PublicacaoController();
