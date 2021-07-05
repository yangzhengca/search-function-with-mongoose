const mongoose = require('mongoose');
const collectorsSchema = new mongoose.Schema({
  title: String,
  numberOfFilters: String,
});
module.exports = mongoose.model('Collector', collectorsSchema);