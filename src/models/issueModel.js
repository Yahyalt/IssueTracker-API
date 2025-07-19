const db = require('../config/db');

const Issue = {
  async create(issue) {
    return db('issues').insert(issue).returning('*');
  },

  async findById(id) {
    return db('issues').where({ id }).first();
  },

  async findAllByProject(projectId) {
    return db('issues').where({ project_id: projectId });
  },

  async update(id, data) {
    return db('issues').where({ id }).update(data).returning('*');
  },

  async delete(id) {
    return db('issues').where({ id }).del();
  }
};

module.exports = Issue;
