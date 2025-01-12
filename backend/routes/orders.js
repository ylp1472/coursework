const router = require('express').Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const OrderModel = require('../models/Orders');
const NotificationModel = require('../models/Notifications');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	}
});

router.post('/create', async (req, res) => {
	try {
		const order = await OrderModel.create(req.body);

		await NotificationModel.create({
			userId: order.userId,
			title: 'Order Created',
			message: `Your order #${order._id} has been created successfully`,
			type: 'success',
			createdAt: new Date()
		});

		transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: order.email,
			subject: `Order Confirmation #${order._id}`,
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
						.order-item {
							background: #ffffff;
							padding: 15px;
							margin: 10px 0;
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
							<h1>Order Confirmation</h1>
						</div>

						<div class="content">
							<p>Hello,</p>
							<p>Thank you for your order! Here are your order details:</p>

							<div class="order-item">
								<p><strong>Order Number:</strong> #${order._id}</p>
								<p><strong>Date:</strong> ${order.date}</p>
								<p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
							</div>

							<h2>Order Items:</h2>
							${order.cart.map(item => `
								<div class="order-item">
									<p><strong>${item.name}</strong></p>
									<p>Quantity: ${item.quantity}</p>
									<p>Price: LKR ${item.price}</p>
								</div>
							`).join('')}

							<div class="order-item">
								<p><strong>Total Amount:</strong> LKR ${order.totalValue}</p>
							</div>

							<p>You can track your order status in your account dashboard.</p>

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

		res.status(201).json(order);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.get('/', async (req, res) => {
	try {
		const { sort, userId } = req.query;

		if (sort === 'count') {
			const count = await OrderModel.countDocuments({});
			return res.status(200).json({ count });
		}

		// Add filter condition if userId is provided
		const filter = userId ? { userId: userId } : {};
		const orders = await OrderModel.find(filter);
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.put('/update/:id', async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).json({ error: 'Invalid order ID' });
		}

		const order = await OrderModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
				context: 'query'
			}
		);

		if (!order) {
			return res.status(404).json({ error: 'Order not found' });
		}

		if (req.body.status) {
			await NotificationModel.create({
				userId: order.userId,
				title: 'Order Status Updated',
				message: `Your order #${order._id} status has been updated to ${req.body.status}`,
				type: 'success',
				createdAt: new Date()
			});

			transporter.sendMail({
				from: process.env.EMAIL_USER,
				to: order.email,
				subject: `Order Status Update #${order._id}`,
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
								<h1>Order Status Update</h1>
							</div>

							<div class="content">
								<p>Hello,</p>
								<p>There has been an update to your order:</p>

								<div class="status-update">
									<p><strong>Order Number:</strong> #${order._id}</p>
									<p><strong>New Status:</strong> ${req.body.status}</p>
									<p><strong>Updated On:</strong> ${new Date().toLocaleString()}</p>
								</div>

								<p>You can track your order anytime by visiting your account dashboard.</p>

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

		res.status(200).json(order);
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
			return res.status(400).json({ error: 'Invalid order ID' });
		}

		const order = await OrderModel.findByIdAndDelete(req.params.id);

		if (!order) {
			return res.status(404).json({ error: 'Order not found' });
		}

		res.status(200).json({ message: 'Order deleted successfully' });
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

module.exports = router;