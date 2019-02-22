const knex = require('knex');

const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);

module.exports = {
  getAction,
  addAction,
  getActionById,
};

function getAction() {
  return db('actions');
}
function getActionById(id) {
  return db('projects')
    .where({ id })
    .first();
}

function addAction(action) {
  return db('actions')
    .insert(action)
    .into('actions');
}
