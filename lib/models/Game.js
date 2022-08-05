const pool = require('../utils/pool');

class Game {
  id;
  title;
  age;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.popularity = row.popularity;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    select * from games
    `);
    return rows.map((row => new Game(row)));
  }

  static async getById(id) {
    const { rows } = await pool.query(`
    select * from games
    where id = $1
    `,
    [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Game(rows[0]);
  }

  static async insert({ title, popularity }) {
    const { rows } = await pool.query(`
    insert into games (title, popularity)
    values ($1, $2)
    returning *`,
    [title, popularity]
    );
    return new Game(rows[0]);
  }

  static async updateById(id, newGame) {
    const game = await Game.getById(id);

    if (!game) return null;

    const updatedData = { ...game, ...newGame };

    const { rows } = await pool.query(`
    update games
    set title = $2, popularity = $3
    where id = $1 returning *`,
    [
      id,
      updatedData.title,
      updatedData.popularity
    ]
    );
    return new Game(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(`
    delete from games
    where id = $1
    returning *`,
    [id]
    );
    return new Game(rows[0]);
  }
}

module.exports = { Game };

