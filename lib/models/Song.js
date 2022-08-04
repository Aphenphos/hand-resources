const pool = require('../utils/pool');

class Song {
  id;
  name;
  rating;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.rating = row.rating;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    select * from songs
    `);
    return rows.map((row => new Song(row)));
  }

  static async getById(id) {
    const { rows } = await pool.query(`
    select * from songs
    where id = $1
    `,
    [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Song(rows[0]);
  }

  static async insert({ name, rating }) {
    const { rows } = await pool.query(`
    insert into songs (name, rating)
    values ($1, $2)
    returning *`,
    [name, rating]
    );
    return new Song(rows[0]);
  }

  static async updateById(id, newSong) {
    const song = await Song.getById(id);

    if (!song) return null;

    const updatedData = { ...song, ...newSong };

    const { rows } = await pool.query(`
    update songs
    set name = $2, rating = $3
    where id = $1 returning *`,
    [
      id,
      updatedData.name,
      updatedData.rating
    ]
    );
    return new Song(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(`
    delete from songs
    where id = $1
    returning *`,
    [id]
    );
    return new Song(rows[0]);
  }
}

module.exports = { Song };

