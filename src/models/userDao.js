// const { connection } = require('../models/dataSource');
const { dataSource } = require('./dataSource');

const addUser = async (email, password) => {
  const result = await dataSource.query(
    `
    INSERT INTO users (email, password)
    VALUES (?, ?);
  `,
    [email, password]
  );

  return result.insertId;
};

const getUser = async (email) => {
  const [result] = await dataSource.query(
    `
    SELECT * FROM users
    WHERE email=?;
    `,
    [email]
  );

  return result;
};

module.exports = {
  addUser,
  getUser,
};
