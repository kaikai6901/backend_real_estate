const mongoose = require('mongoose');

const baseProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  project_id: { type: String, require: true},
  avg_price: { type: Number, require: false},
  avg_square: {type: Number, require: false},
  n_news: {type: Number, require: false},
  loc: {type: Object}
});

const BaseProject = mongoose.model('BaseProject', baseProjectSchema, 'base_project');

module.exports = BaseProject;
