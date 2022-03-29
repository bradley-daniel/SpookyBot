const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
	userID: { type: String },
	serverID: { type: String },
	tokens: { type: Number },
	inventory: { type: Array },
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;
