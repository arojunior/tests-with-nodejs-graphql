import mysql from '../database/mysql';

const findById = async id => {
  try {
    const { rows } = await mysql.execute(`select * from post where id = ?`, [id]);
    return rows && rows.length ? rows[0] : null;
  } catch (error) {
    console.log(`[ERROR]: findById`, error);
    return error;
  }
};

const findAll = async () => {
  try {
    const { rows } = await mysql.execute(`select * from post`);
    return rows;
  } catch (error) {
    console.log(`[ERROR]: findAll`, error);
    return error;
  }
};

export default {
  findById,
  findAll,
};
