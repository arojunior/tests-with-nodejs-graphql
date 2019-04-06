import mysql from '../database/mysql';

const findById = async id => {
  try {
    const { rows } = await mysql.execute(`select * from post where id = ?`, [id]);
    return rows && rows.length ? rows[0] : null;
  } catch (error) {
    console.log(`[ERROR]: findById`, error);
    return null;
  }
};

const findAll = async () => {
  try {
    const { rows } = await mysql.execute(`select * from post`);
    return rows;
  } catch (error) {
    console.log(`[ERROR]: findAll`, error);
    return null;
  }
};

const create = async post => {
  try {
    const {
      rows: { insertId },
    } = await mysql.execute(`insert into post (content, created) values (?,?)`, [
      post.content,
      new Date(),
    ]);
    return findById(insertId);
  } catch (error) {
    console.log(`[ERROR]: create`, error);
    return null;
  }
};

export default {
  findById,
  findAll,
  create,
};
