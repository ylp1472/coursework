const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	type: {
		type: String,
		enum: ['success', 'failure'],
		required: true
	},
	status: {
		type: String,
		enum: ['read', 'unread'],
		default: 'unread'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const NotificationModel = mongoose.model('notifications', NotificationSchema);
module.exports = NotificationModel;