const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  title: String,
  description: String,
  url: String,
  intensity: String,
  muscle: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;