const pool = require('../utils/pool');

class Smell {
  id;
  name;
  description;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.description = row.description;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    select * from smells
    `);
    return rows.map((row => new Smell(row)));
  }

  static async getById(id) {
    const { rows } = await pool.query(`
    select * from smells
    where id = $1
    `,
    [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Smell(rows[0]);
  }

  static async insert({ name, description }) {
    const { rows } = await pool.query(`
    insert into smells (name, description)
    values ($1, $2)
    returning *`,
    [name, description]
    );
    return new Smell(rows[0]);
  }

  static async updateById(id, newSmell) {
    const smell = await Smell.getById(id);

    if (!smell) return null;

    const updatedData = { ...smell, ...newSmell };

    const { rows } = await pool.query(`
    update smells
    set name = $2, description = $3
    where id = $1 returning *`,
    [
      id,
      updatedData.name,
      updatedData.description
    ]
    );
    return new Smell(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(`
    delete from smells
    where id = $1
    returning *`,
    [id]
    );
    return new Smell(rows[0]);
  }
}

module.exports = { Smell };

