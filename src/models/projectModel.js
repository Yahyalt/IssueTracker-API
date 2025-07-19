const db = require("../config/db");

const Project = {
  async create(project) {
    return db("projects").insert(project).returning("*");
  },
  async findById(id) {
    return db("projects").where({ id }).first();
  },
  async findAll() {
    return db("projects").select("*");
  },
  async findByUserId(userId) {
    return db('projects').where({ created_by: userId });
  },
  async update(id, data) {
    return db("projects").where({ id }).update(data).returning("*");
  },
  async delete(id) {
    return db("projects").where({ id }).del();
  },
}; 
module.exports = Project;