import mysql from 'mysql2/promise';

const main = async () => {
  const connection = await mysql.createConnection({
    host: `localhost`,
    user: `user`,
    password: `password`,
    database: `mydb`,
  });
  return connection;
};

const execute = async (queryString, params = null) => {
  const connection = await main();
  const [rows, fields] = await connection.execute(queryString, params);
  connection.close();

  return {
    rows,
    fields,
  };
};

export default { execute };
