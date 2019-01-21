import mysql from '../database/mysql';

const findById = async id => {
  const { rows } = await mysql.execute(`select * from post where id = ?`, [id]);
  return rows;
};

const findAll = async () => {
  const { rows } = await mysql.execute(`select * from post`);
  return rows;
};

export default {
  findById,
  findAll,
};
