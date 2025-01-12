const router = require('express').Router();
const mongoose = require('mongoose');
const NotificationModel = require('../models/Notifications');

// Create a notification
router.post('/create', async (req, res) => {
	try {
		const notification = await NotificationModel.create({
			...req.body,
			createdAt: new Date()
		});
		res.status(201).json(notification);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Get all notifications with filters and pagination
router.get('/all', async (req, res) => {
	try {
		const { type, status, page = 1, limit = 10 } = req.query;
		const filter = {};

		if (type) filter.type = type;
		if (status) filter.status = status;

		const notifications = await NotificationModel.find(filter)
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(parseInt(limit));

		const total = await NotificationModel.countDocuments(filter);

		res.status(200).json({
			notifications,
			currentPage: parseInt(page),
			totalPages: Math.ceil(total / limit),
			totalNotifications: total
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get notifications for a specific user with filters
router.get('/user/:userId', async (req, res) => {
	try {
		const { type, status } = req.query;
		const filter = { userId: req.params.userId };

		if (type) filter.type = type;
		if (status) filter.status = status;

		const notifications = await NotificationModel.find(filter)
			.sort({ createdAt: -1 });
		res.status(200).json(notifications);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get unread notifications count
router.get('/user/:userId/unread/count', async (req, res) => {
	try {
		const count = await NotificationModel.countDocuments({
			userId: req.params.userId,
			status: 'unread'
		});
		res.status(200).json({ count });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get notifications by type
router.get('/type/:type', async (req, res) => {
	try {
		const notifications = await NotificationModel.find({
			type: req.params.type
		}).sort({ createdAt: -1 });
		res.status(200).json(notifications);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Mark single notification as read/unread
router.patch('/:id/status', async (req, res) => {
	try {
		const { status } = req.body;
		if (!['read', 'unread'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const notification = await NotificationModel.findByIdAndUpdate(
			req.params.id,
			{ status },
			{ new: true }
		);

		if (!notification) {
			return res.status(404).json({ error: 'Notification not found' });
		}

		res.status(200).json(notification);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Mark all notifications as read for a user
router.patch('/user/:userId/read-all', async (req, res) => {
	try {
		await NotificationModel.updateMany(
			{ userId: req.params.userId, status: 'unread' },
			{ status: 'read' }
		);
		res.status(200).json({ message: 'All notifications marked as read' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Delete a notification
router.delete('/:id', async (req, res) => {
	try {
		const notification = await NotificationModel.findByIdAndDelete(req.params.id);
		if (!notification) {
			return res.status(404).json({ error: 'Notification not found' });
		}
		res.status(200).json({ message: 'Notification deleted successfully' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Delete all notifications for a user
router.delete('/user/:userId', async (req, res) => {
	try {
		await NotificationModel.deleteMany({ userId: req.params.userId });
		res.status(200).json({ message: 'All notifications deleted successfully' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;