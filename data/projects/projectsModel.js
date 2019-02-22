const knex = require('knex');

const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);

module.exports = {
  get,
  getById,
  add,
  update,
  remove,
  getActionByProject,
};

function get() {
  return db('projects');
}

function getById(id) {
  return db('projects')
    .where({ id })
    .first();
}

function add(project) {
  return db('projects')
    .insert(project)
    .into('projects');
}

function update(id, changes) {
  return db('projects')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('projects')
    .where({ id })
    .del();
}

function getActionByProject(projectId) {
  return db('actions').where('project_id', projectId);
}
