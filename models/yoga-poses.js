const mongoose = require('mongoose');

const yogaSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  image: {type: String},
  tip: {type: String},
  targets: {type: String},
  modifications: {type: String},
  difficulty: {type: String}

});

const Yoga = mongoose.model('Yoga', yogaSchema);
module.exports = Yoga;