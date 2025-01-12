const router = require('express').Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const TicketModel = require('../models/SupportTickets');
const NotificationModel = require('../models/Notifications');
const UserModel = require('../models/Users');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	}
});

router.post('/create', async (req, res) => {
	try {
		const ticket = await TicketModel.create(req.body);

		// Check if email exists in users collection
		const user = await UserModel.findOne({ email: req.body.email });

		// Send confirmation email
		transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: ticket.email,
			subject: 'Support Ticket Created',
			html: `
				<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
				<html xmlns="http://www.w3.org/1999/xhtml">

				<head>
					<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</head>

				<body>
					<style>
						body {
							font-family: Arial, sans-serif;
							margin: 0;
							padding: 0;
							color: #333333;
						}
						a {
							color: #E21A1A;
							text-decoration: none;
						}
						a:hover {
							color: #F71B1B;
						}
						.container {
							padding: 20px;
							max-width: 600px;
							margin: 0 auto;
							border-radius: 5px;
							background-color: #F2F2F2;
						}
						.header {
							text-align: center;
						}
						.content {
							padding: 20px;
						}
						.ticket-details {
							background: #ffffff;
							padding: 15px;
							margin: 15px 0;
							border-radius: 5px;
						}
						.footer {
							text-align: center;
							padding: 10px;
							background-color: #DDDDDD;
						}
					</style>

					<div class="container">
						<div class="header">
							<h1>Support Ticket Created</h1>
						</div>

						<div class="content">
							<p>Hello,</p>
							<p>Your support ticket has been successfully created.</p>

							<div class="ticket-details">
								<p><strong>Ticket Details:</strong></p>
								<p>Ticket ID: ${ticket._id}</p>
								<p>Subject: ${ticket.subject}</p>
								<p>Description: ${ticket.description}</p>
								<p>Status: ${ticket.status}</p>
							</div>

							<p>Our support team will review your ticket and respond as soon as possible. We'll notify you when there's an update.</p>

							<p>Need additional help? Contact our support team at: <a href="mailto:contact@flavourdash.com">contact@flavourdash.com</a></p>
							<p>Best regards,</p>
							<p>The FlavourDash Team</p>
						</div>

						<div class="footer">
							<p>&copy; 2024 FlavourDash • All Rights Reserved</p>
						</div>
					</div>
				</body>

				</html>
			`
		});

		if (user) {
			// Create notification
			await NotificationModel.create({
				userId: user._id,
				title: 'Support Ticket Created',
				message: `Your support ticket for "${ticket.subject}" has been created`,
				type: 'success',
				createdAt: new Date()
			});

			// Update ticket with userId
			await TicketModel.findByIdAndUpdate(
				ticket._id,
				{ userId: user._id },
				{ new: true }
			);
		}

		res.status(201).json(ticket);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.get('/', async (req, res) => {
	try {
		const { sort } = req.query;

		if (sort === 'count') {
			const count = await TicketModel.countDocuments({});
			return res.status(200).json({ count });
		}

		const tickets = await TicketModel.find({});
		res.status(200).json(tickets);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.put('/update/:id', async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).json({ error: 'Invalid ticket ID' });
		}

		const ticket = await TicketModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);

		if (!ticket) {
			return res.status(404).json({ error: 'Ticket not found' });
		}

		// Find user by email
		const user = await UserModel.findOne({ email: ticket.email });

		// Send status update email
		transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: ticket.email,
			subject: 'Support Ticket Update',
			html: `
				<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
				<html xmlns="http://www.w3.org/1999/xhtml">

				<head>
					<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</head>

				<body>
					<style>
						body {
							font-family: Arial, sans-serif;
							margin: 0;
							padding: 0;
							color: #333333;
						}
						a {
							color: #E21A1A;
							text-decoration: none;
						}
						a:hover {
							color: #F71B1B;
						}
						.container {
							padding: 20px;
							max-width: 600px;
							margin: 0 auto;
							border-radius: 5px;
							background-color: #F2F2F2;
						}
						.header {
							text-align: center;
						}
						.content {
							padding: 20px;
						}
						.ticket-details {
							background: #ffffff;
							padding: 15px;
							margin: 15px 0;
							border-radius: 5px;
						}
						.footer {
							text-align: center;
							padding: 10px;
							background-color: #DDDDDD;
						}
					</style>

					<div class="container">
						<div class="header">
							<h1>Support Ticket Update</h1>
						</div>

						<div class="content">
							<p>Hello,</p>
							<p>There has been an update to your support ticket.</p>

							<div class="ticket-details">
								<p><strong>Updated Ticket Details:</strong></p>
								<p>Ticket ID: ${ticket._id}</p>
								<p>Subject: ${ticket.subject}</p>
								<p>Status: ${ticket.status}</p>
								${ticket.response ? `<p>Response: ${ticket.response}</p>` : ''}
							</div>

							<p>You can reply to this email if you have any questions about this update.</p>

							<p>Need additional help? Contact our support team at: <a href="mailto:contact@flavourdash.com">contact@flavourdash.com</a></p>
							<p>Best regards,</p>
							<p>The FlavourDash Team</p>
						</div>

						<div class="footer">
							<p>&copy; 2024 FlavourDash • All Rights Reserved</p>
						</div>
					</div>
				</body>

				</html>
			`
		});

		if (user && req.body.status) {
			let notificationMessage = '';

			switch (req.body.status) {
				case 'Closed':
					notificationMessage = `Your support ticket for "${ticket.subject}" has been closed`;
					break;
				case 'Open':
					notificationMessage = `Your support ticket for "${ticket.subject}" has been reopened`;
					break;
				default:
					notificationMessage = `Your support ticket for "${ticket.subject}" status has been updated to ${req.body.status}`;
			}

			await NotificationModel.create({
				userId: user._id,
				title: 'Support Ticket Updated',
				message: notificationMessage,
				type: 'success',
				createdAt: new Date()
			});
		}

		res.status(200).json(ticket);
	} catch (err) {
		if (err.name === 'ValidationError') {
			return res.status(400).json({ error: err.message });
		}
		res.status(500).json({ error: 'Server error' });
	}
});

router.delete('/delete/:id', async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).json({ error: 'Invalid ticket ID' });
		}

		const ticket = await TicketModel.findByIdAndDelete(req.params.id);

		if (!ticket) {
			return res.status(404).json({ error: 'Ticket not found' });
		}

		res.status(200).json({ message: 'Ticket deleted successfully' });
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

module.exports = router;