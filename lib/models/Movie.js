const pool = require('../utils/pool');

class Movie {
  id;
  title;
  imdb;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.imdb = row.imdb;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    select * from movies
    `);
    return rows.map((row => new Movie(row)));
  }

  static async getById(id) {
    const { rows } = await pool.query(`
    select * from movies
    where id = $1
    `,
    [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Movie(rows[0]);
  }

  static async insert({ title, imdb }) {
    const { rows } = await pool.query(`
    insert into Movies (title, imdb)
    values ($1, $2)
    returning *`,
    [title, imdb]
    );
    return new Movie(rows[0]);
  }

  static async updateById(id, newMovie) {
    const movie = await Movie.getById(id);

    if (!movie) return null;

    const updatedData = { ...movie, ...newMovie };

    const { rows } = await pool.query(`
    update Movies
    set title = $2, imdb = $3
    where id = $1 returning *`,
    [
      id,
      updatedData.title,
      updatedData.imdb
    ]
    );
    return new Movie(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(`
    delete from movies
    where id = $1
    returning *`,
    [id]
    );
    return new Movie(rows[0]);
  }
}

module.exports = { Movie };

