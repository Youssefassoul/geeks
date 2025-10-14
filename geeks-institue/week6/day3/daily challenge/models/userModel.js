const knex = require("../config/db");

const createUser = async (trx, userData, hashedPwd) => {
  await trx("users").insert(userData);
  await trx("hashpwd").insert({
    username: userData.username,
    password: hashedPwd,
  });
};

const getAllUsers = () => knex("users").select("*");

const getUserById = (id) => knex("users").where({ id }).first();

const getUserByUsername = (username) =>
  knex("hashpwd").where({ username }).first();

const updateUser = (id, data) => knex("users").where({ id }).update(data);

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
};
