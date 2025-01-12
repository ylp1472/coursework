const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
	userId: String,
	email: String,
	date: String,
	subject: String,
	description: String,
	status: String,
});

const TicketModel = mongoose.model('tickets', TicketSchema);
module.exports = TicketModel;