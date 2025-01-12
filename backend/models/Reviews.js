const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
	userId: String,
	fullName: String,
	rating: String,
	description: String,
	status: String,
});

const ReviewModel = mongoose.model('reviews', ReviewSchema);
module.exports = ReviewModel;