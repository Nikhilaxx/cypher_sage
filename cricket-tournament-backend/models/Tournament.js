const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  match: { type: String, required: true },
  tournament: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Tournament', tournamentSchema);
