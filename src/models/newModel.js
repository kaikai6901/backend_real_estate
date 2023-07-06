const mongoose = require('mongoose');

const New = new mongoose.Schema({
  price_per_m2: { type: Number, required: true },
  published_at: { type: Date, required: true },
  district: { type: String, required: true },
  news_id: {type: String, require: true}
  // Other fields...
});


module.exports = mongoose.model('New', New, 'new');
