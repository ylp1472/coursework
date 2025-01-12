const router = require('express').Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const ReviewModel = require('../models/Reviews');
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
		const review = await ReviewModel.create(req.body);

		// Create notification if userId exists
		if (review.userId) {
			// Get user email from UserModel
			const user = await UserModel.findById(review.userId);

			await NotificationModel.create({
				userId: review.userId,
				title: 'Review Submitted',
				message: 'Your review has been submitted and is pending approval',
				type: 'success',
				createdAt: new Date()
			});

			// Send email to user's email
			if (user && user.email) {
				transporter.sendMail({
					from: process.env.EMAIL_USER,
					to: user.email,
					subject: 'Review Submission Confirmation',
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
								.review-details {
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
									<h1>Review Submission Confirmation</h1>
								</div>

								<div class="content">
									<p>Hello,</p>
									<p>Thank you for sharing your feedback with FlavourDash!</p>

									<div class="review-details">
										<p><strong>Your Review Details:</strong></p>
										<p>Rating: ${review.rating} stars</p>
										<p>Comment: "${review.comment}"</p>
										<p>Status: Pending Approval</p>
									</div>

									<p>Our team will review your submission shortly. We appreciate your feedback as it helps us improve our services.</p>

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
			}
		}

		res.status(201).json(review);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.get('/', async (req, res) => {
	try {
		const { sort } = req.query;

		if (sort === 'count') {
			const count = await ReviewModel.countDocuments({});
			return res.status(200).json({ count });
		}

		if (sort === 'Approved') {
			const reviews = await ReviewModel.find({ status: 'Approved' });
			return res.status(200).json(reviews);
		}

		const reviews = await ReviewModel.find({});
		res.status(200).json(reviews);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.put('/update/:id', async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).json({ error: 'Invalid review ID' });
		}

		const review = await ReviewModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);

		if (!review) {
			return res.status(404).json({ error: 'Review not found' });
		}

		// Create notification if review is approved and userId exists
		if (req.body.status === 'Approved' && review.userId) {
			// Get user email from UserModel
			const user = await UserModel.findById(review.userId);

			await NotificationModel.create({
				userId: review.userId,
				title: 'Review Approved',
				message: 'Your review has been approved and is now published',
				type: 'success',
				createdAt: new Date()
			});

			// Send email to user's email
			if (user && user.email) {
				transporter.sendMail({
					from: process.env.EMAIL_USER,
					to: user.email,
					subject: 'Review Approved',
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
								.review-details {
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
									<h1>Review Status Update</h1>
								</div>

								<div class="content">
									<p>Hello,</p>
									<p>Your review has been ${review.status.toLowerCase()}!</p>

									<div class="review-details">
										<p><strong>Review Details:</strong></p>
										<p>Rating: ${review.rating} stars</p>
										<p>Comment: "${review.comment}"</p>
										<p>Status: ${review.status}</p>
									</div>

									<p>Your review is now published and visible to other users.</p>

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
			}
		}

		res.status(200).json(review);
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
			return res.status(400).json({ error: 'Invalid review ID' });
		}

		const review = await ReviewModel.findByIdAndDelete(req.params.id);

		if (!review) {
			return res.status(404).json({ error: 'Review not found' });
		}

		res.status(200).json({ message: 'Review deleted successfully' });
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

module.exports = router;