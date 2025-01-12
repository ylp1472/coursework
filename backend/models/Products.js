const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	name: String,
	price: Number,
	discount: Number,
	quantity: Number,
	description: String,
	foodType: String,
	category: String,
	portion: String,
	image: String
});

const ProductModel = mongoose.model('products', ProductSchema);
module.exports = ProductModel;