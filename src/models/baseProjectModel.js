const mongoose = require('mongoose');

const baseProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  project_id: { type: String, require: true}
});

const BaseProject = mongoose.model('BaseProject', baseProjectSchema);

module.exports = BaseProject;
