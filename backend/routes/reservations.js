const router = require('express').Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const ReservationModel = require('../models/Reservations');
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
		const reservation = await ReservationModel.create(req.body);

		// Check if email exists in users collection
		const user = await UserModel.findOne({ email: req.body.email });

		transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: reservation.email,
			subject: 'Table Reservation Confirmation',
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
						.reservation-details {
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
							<h1>Table Reservation Confirmation</h1>
						</div>

						<div class="content">
							<p>Hello,</p>
							<p>Thank you for choosing FlavourDash! Your table reservation request has been received.</p>

							<div class="reservation-details">
								<h3>Reservation Details:</h3>
								<p><strong>Date:</strong> ${reservation.date}</p>
								<p><strong>Time:</strong> ${reservation.startTime} - ${reservation.endTime}</p>
								<p><strong>Number of People:</strong> ${reservation.personCount}</p>
								<p><strong>Status:</strong> ${reservation.status}</p>
							</div>

							<p>We'll notify you once your reservation is confirmed by our team.</p>

							<p><strong>Important Notes:</strong></p>
							<ul>
								<li>Please arrive on time</li>
								<li>Reservation will be held for 15 minutes after booking time</li>
								<li>Contact us if you need to modify or cancel your reservation</li>
							</ul>

							<p>Need help? Contact our support team at: <a href="mailto:contact@flavourdash.com">contact@flavourdash.com</a></p>
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

		// If user found, create notification
		if (user) {
			await NotificationModel.create({
				userId: user._id,
				title: 'New Reservation',
				message: `Your table reservation for ${reservation.date} at ${reservation.startTime} has been created and is being processed`,
				type: 'success',
				createdAt: new Date()
			});

			// Update reservation with userId
			await ReservationModel.findByIdAndUpdate(
				reservation._id,
				{ userId: user._id },
				{ new: true }
			);
		}

		res.status(201).json(reservation);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.get('/', async (req, res) => {
	try {
		const { sort, userId } = req.query;

		if (sort === 'count') {
			const count = await ReservationModel.countDocuments({});
			return res.status(200).json({ count });
		}

		// Add filter condition if userId is provided
		const filter = userId ? { userId: userId } : {};
		const reservations = await ReservationModel.find(filter);
		res.status(200).json(reservations);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.put('/update/:id', async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).json({ error: 'Invalid reservation ID' });
		}

		const reservation = await ReservationModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);

		if (!reservation) {
			return res.status(404).json({ error: 'Reservation not found' });
		}

		// Find user by email if reservation has email
		if (reservation.email) {
			const user = await UserModel.findOne({ email: reservation.email });

			// Create notification if user exists and status is changed
			if (user && req.body.status) {
				let notificationData = {
					userId: user._id,
					type: 'success',
					createdAt: new Date()
				};

				switch (req.body.status) {
					case 'Approved':
						notificationData.title = 'Reservation Approved';
						notificationData.message = `Your table reservation for ${reservation.date} at ${reservation.startTime} has been approved`;
						break;

					case 'Declined':
						notificationData.title = 'Reservation Declined';
						notificationData.message = `Your table reservation for ${reservation.date} at ${reservation.startTime} has been declined`;
						notificationData.type = 'failure';
						break;

					case 'Pending':
						notificationData.title = 'Reservation Processing';
						notificationData.message = `Your table reservation for ${reservation.date} at ${reservation.startTime} is being processed`;
						break;
				}

				await NotificationModel.create(notificationData);
			}
		}

		transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: reservation.email,
			subject: 'Reservation Status Update',
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
						.status-update {
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
							<h1>Reservation Status Update</h1>
						</div>

						<div class="content">
							<p>Hello,</p>
							<p>There has been an update to your table reservation:</p>

							<div class="status-update">
								<p><strong>New Status:</strong> ${reservation.status}</p>
								<p><strong>Reservation Details:</strong></p>
								<p>Date: ${reservation.date}</p>
								<p>Time: ${reservation.startTime} - ${reservation.endTime}</p>
								<p>Number of People: ${reservation.personCount}</p>
							</div>

							<p>If you have any questions about this update, please don't hesitate to contact us.</p>

							<p>Need help? Contact our support team at: <a href="mailto:contact@flavourdash.com">contact@flavourdash.com</a></p>
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

		res.status(200).json(reservation);
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
			return res.status(400).json({ error: 'Invalid reservation ID' });
		}

		const reservation = await ReservationModel.findByIdAndDelete(req.params.id);

		if (!reservation) {
			return res.status(404).json({ error: 'Reservation not found' });
		}

		res.status(200).json({ message: 'Reservation deleted successfully' });
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

module.exports = router;