
const db = require('../config/database');

module.exports = {
  getAllRiders: (callback) => db.getAllRiders(callback),
  getRiderById: (id, callback) => db.getRiderById(id, callback),
  createRider: (rider, callback) => db.createRider(rider, callback),
  updateRider: (id, rider, callback) => db.updateRider(id, rider, callback),
  deleteRider: (id, callback) => db.deleteRider(id, callback)
};
