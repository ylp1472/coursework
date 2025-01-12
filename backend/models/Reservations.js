const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: false
	},
	email: String,
	phone: String,
	personCount: Number,
	date: String,
	startTime: String,
	endTime: String,
	status: String,
});

const ReservationModel = mongoose.model('reservations', ReservationSchema);
module.exports = ReservationModel;