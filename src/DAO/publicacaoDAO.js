const db = require("../database/connection");

class PublicacaoDAO {
  async listAll() {
    const { rows } = await db.query(
      `SELECT id_publicacao, titulo, descricao, endereco, criado_em, id_usuario
       FROM publicacao
       ORDER BY id_publicacao DESC`
    );
    return rows;
  }

  async getById(id) {
    const { rows } = await db.query(
      `SELECT id_publicacao, titulo, descricao, endereco, criado_em, id_usuario
       FROM publicacao WHERE id_publicacao = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async create(data) {
    const { titulo, descricao, endereco, id_usuario } = data;

    const { rows } = await db.query(
      `INSERT INTO publicacao (titulo, descricao, endereco, id_usuario)
       VALUES ($1, $2, $3, $4)
       RETURNING id_publicacao, titulo, descricao, endereco, criado_em, id_usuario`,
      [titulo, descricao, endereco, id_usuario]
    );

    // Chama o procedure após criar a publicação
    await db.query(`CALL incrementa_postagens($1)`, [id_usuario]);

    return rows[0];
  }

  async totalPostsByUser(id_usuario) {
    const { rows } = await db.query(
      `SELECT total_posts FROM usuario WHERE id_usuario = $1`,
      [id_usuario]
    );

    return rows[0]?.total_posts || 0;
  }

  async update(id, patch) {
    const { titulo, descricao, endereco } = patch;

    const { rows } = await db.query(
      `UPDATE publicacao SET
          titulo = COALESCE($1, titulo),
          descricao = COALESCE($2, descricao),
          endereco = COALESCE($3, endereco)
       WHERE id_publicacao = $4
       RETURNING *`,
      [titulo ?? null, descricao ?? null, endereco ?? null, id]
    );

    return rows[0] || null;
  }

  async remove(id) {
    // pega id_usuario antes de apagar
    const r1 = await db.query(
      `SELECT id_usuario FROM publicacao WHERE id_publicacao = $1`,
      [id]
    );

    if (!r1.rows[0]) return null;

    const idUsuario = r1.rows[0].id_usuario;

    // deleta e retorna o registro deletado
    const r2 = await db.query(
      `DELETE FROM publicacao WHERE id_publicacao = $1 RETURNING *`,
      [id]
    );

    // chama o procedure (se tinha usuário)
    if (idUsuario) {
      await db.query(`CALL decrementa_postagens($1)`, [idUsuario]);
    }

    return r2.rows[0] || null;
  }
}

module.exports = new PublicacaoDAO(); // exporta a classe, igual o professor
