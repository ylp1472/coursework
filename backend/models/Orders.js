const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	email: String,
	date: String,
	cart: Array,
	totalValue: String,
	totalValueUSD: String,
	status: String,
	paymentId: String,
	paymentStatus: {
		type: String,
		enum: ['pending', 'completed', 'failed'],
		default: 'pending'
	}
});

const OrderModel = mongoose.model('orders', OrderSchema);
module.exports = OrderModel;