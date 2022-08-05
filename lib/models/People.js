const pool = require('../utils/pool');

class People {
  id;
  name;
  age;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    select * from peoples
    `);
    return rows.map((row => new People(row)));
  }

  static async getById(id) {
    const { rows } = await pool.query(`
    select * from peoples
    where id = $1
    `,
    [id]);
    if (rows.length === 0) {
      return null;
    }
    return new People(rows[0]);
  }

  static async insert({ name, age }) {
    const { rows } = await pool.query(`
    insert into peoples (name, age)
    values ($1, $2)
    returning *`,
    [name, age]
    );
    return new People(rows[0]);
  }

  static async updateById(id, newPeople) {
    const people = await People.getById(id);

    if (!people) return null;

    const updatedData = { ...people, ...newPeople };

    const { rows } = await pool.query(`
    update peoples
    set name = $2, age = $3
    where id = $1 returning *`,
    [
      id,
      updatedData.name,
      updatedData.age
    ]
    );
    return new People(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(`
    delete from peoples
    where id = $1
    returning *`,
    [id]
    );
    return new People(rows[0]);
  }
}

module.exports = { People };

