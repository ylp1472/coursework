const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const UserModel = require('../models/Users');
const AdminModel = require('../models/Admins');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	console.error('FATAL ERROR: JWT_SECRET is not defined');
	process.exit(1);
}

const verificationCodes = new Map();

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	}
});

// Authentication Middleware
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) {
			console.error('Token verification error:', err);
			return res.sendStatus(403);
		}
		req.user = user;
		next();
	});
};

// User Login
router.post('/login', async (req, res) => {
	console.log('Login request received:', req.body);
	const { email, password } = req.body;

	try {
		// Check users collection first
		let user = await UserModel.findOne({ email });
		console.log('User check in users collection:', user ? 'found' : 'not found');
		let role = 'Customer';
		let collection = 'users';

		// If not found in users, check admins
		if (!user) {
			user = await AdminModel.findOne({ email });
			console.log('User check in admins collection:', user ? 'found' : 'not found');
			role = 'Admin';
			collection = 'admins';
		}

		if (!user) {
			console.log('No user found in either collection');
			return res.status(401).json({
				success: false,
				message: 'Invalid credentials'
			});
		}

		// Verify password
		const isValid = await bcrypt.compare(password, user.password);
		console.log('Password validation:', isValid ? 'success' : 'failed');

		if (!isValid) {
			return res.status(401).json({
				success: false,
				message: 'Invalid credentials'
			});
		}

		const token = jwt.sign(
			{ id: user._id, role, collection },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		);

		res.json({
			success: true,
			token,
			role,
			user: {
				id: user._id,
				email: user.email,
				name: user.name,
				role
			}
		});
		console.log('Login successful, role:', role);

	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({
			success: false,
			message: 'Server error during login'
		});
	}
});

// Register User
router.post('/register', async (req, res) => {
	try {
		const { name, email, password, role } = req.body;
		console.log('Registration request received:', req.body);

		// Validate role
		if (role !== 'Customer' && role !== 'Admin') {
			return res.status(400).json({
				success: false,
				message: 'Invalid role specified'
			});
		}

		// Check if email exists in either collection
		const existingUser = await UserModel.findOne({ email });
		const existingAdmin = await AdminModel.findOne({ email });

		if (existingUser || existingAdmin) {
			return res.status(400).json({
				success: false,
				message: 'Email already registered'
			});
		}

		// Create new user based on role
		const Model = role === 'Admin' ? AdminModel : UserModel;
		const newUser = new Model({
			name,
			email,
			password,
			role
		});

		await newUser.save();

		// Generate token
		const token = jwt.sign(
			{ id: newUser._id, role },
			JWT_SECRET,
			{ expiresIn: '24h' }
		);

		res.status(201).json({
			success: true,
			token,
			role,
			user: {
				id: newUser._id,
				name: newUser.name,
				email: newUser.email
			}
		});

		transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: `Welcome to FlavourDash, ${name.split(' ')[0]}!`,
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
						.footer {
							text-align: center;
							padding: 10px;
							background-color: #DDDDDD;
						}
					</style>

					<div class="container">
						<div class="header">
							<h1>Welcome to FlavourDash, ${name.split(' ')[0]}!</h1>
						</div>

						<div class="content">
							<p>We're thrilled to have you join us at FlavourDash, your premier destination for delicious food and exceptional dining experiences.</p>
							<p>Explore our extensive features designed to enhance your dining journey:</p>
							<ul>
								<li><b>Online Food Ordering:</b> Browse our diverse menu categories and place orders from anywhere with our user-friendly ordering system.</li>
								<li><b>Real-time Help Chat:</b> Get instant assistance through our live chat feature where our team is ready to help with your orders and questions.</li>
								<li><b>Table Reservations:</b> Make hassle-free table reservations for your dine-in experiences.</li>
								<li><b>Secure PayPal Payments:</b> Enjoy safe and convenient online payments through PayPal integration.</li>
								<li><b>Order Tracking:</b> Track your orders in real-time with our detailed status updates.</li>
								<li><b>Today's Special Deals:</b> Access daily special offers and featured dishes at great prices.</li>
								<li><b>Personal Account:</b> Manage your profile, view order history, and update your preferences easily.</li>
							</ul>

							<p>We're constantly updating our menu and enhancing our services to provide you with the best dining experience!</p>

							<h2>Getting Started</h2>
							<p>Head over to your FlavourDash account now to access all these features and more. Track your orders, save your favorite items, and enjoy member-exclusive benefits.</p>

							<p>Need assistance? Contact our support team at: <a href="mailto:contact@flavourdash.com">contact@flavourdash.com</a></p>
							<p>Visit our Help Center for detailed guides and FAQs.</p>
							<p>Thank you for choosing FlavourDash!</p>
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

		console.log('User Registered:', newUser);
	} catch (err) {
		console.error('Registration error:', err);
		res.status(500).json({
			success: false,
			message: 'Error registering user'
		});
	}
});

// Get User
router.get('/user', authenticateToken, async (req, res) => {
	const { id, role, collection } = req.user;

	try {
		let user = null;
		if (collection === 'users') {
			user = await UserModel.findById(id);
		} else if (collection === 'admins') {
			user = await AdminModel.findById(id);
		}

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found'
			});
		}

		res.json({
			success: true,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role
			}
		});

	} catch (err) {
		console.error('User fetch error:', err);
		res.status(500).json({
			success: false,
			message: 'Error fetching user'
		});
	}
});

// Request 6-digit code
router.post('/request-verification', async (req, res) => {
	try {
		const { email } = req.body;
		console.log('Verification request received:', req.body);

		let user = await UserModel.findOne({ email }) || await AdminModel.findOne({ email });
		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found' });
		}
		console.log('User found:', user);

		const code = Math.floor(100000 + Math.random() * 900000);
		verificationCodes.set(email, { code, expiry: Date.now() + 300000 }); // expires in 5 mins
		console.log('Verification code:', code);

		transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: 'Verification Code',
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
						.verification-code {
							text-align: center;
							padding: 20px;
							margin: 20px 0;
							background: #ffffff;
							border-radius: 5px;
						}
						.code {
							font-size: 32px;
							font-weight: bold;
							letter-spacing: 5px;
							color: #E21A1A;
						}
						.footer {
							text-align: center;
							padding: 10px;
							background-color: #DDDDDD;
						}
					</style>

					<div class="container">
						<div class="header">
							<h1>Password Reset Request</h1>
						</div>

						<div class="content">
							<p>Hello,</p>
							<p>We received a request to reset your FlavourDash account password. Please use the verification code below to proceed with your password reset:</p>

							<div class="verification-code">
								<div class="code">${code}</div>
							</div>

							<p><strong>Important:</strong> This code will expire in 10 minutes for security purposes.</p>
							<p>If you didn't request a password reset, please ignore this email and ensure your account is secure.</p>

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
		console.log('Verification code sent to:', email);

		res.json({ success: true, message: 'Verification code sent' });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Error sending code' });
		console.error('Verification code error:', error);
	}
});

// Verify code and return reset token
router.post('/verify-code', (req, res) => {
	const { email, code } = req.body;
	console.log('Verification code received:', req.body);
	const data = verificationCodes.get(email);
	console.log('Verification data:', data);

	if (!data) {
		console.log('No code found for:', email);
		return res.status(400).json({ success: false, message: 'No code found' })
	};
	if (Date.now() > data.expiry) {
		verificationCodes.delete(email);
		console.log('Code expired for:', email);
		return res.status(400).json({ success: false, message: 'Code expired' });
	}
	if (+code !== data.code) {
		console.log('Invalid code for:', email);
		return res.status(400).json({ success: false, message: 'Invalid code' });
	}

	const resetToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '15m' });
	console.log('Reset token:', resetToken);
	res.json({ success: true, resetToken });
});

// Reset password
router.post('/reset-password-with-token', async (req, res) => {
	try {
		const { resetToken, newPassword } = req.body;
		console.log('Password reset request received:', req.body);

		// Verify token and get email
		const { email } = jwt.verify(resetToken, JWT_SECRET);
		console.log('Email from token:', email);

		// Hash new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		console.log('Hashed password:', hashedPassword);

		// Update password in appropriate collection
		let user = await UserModel.findOneAndUpdate(
			{ email },
			{ password: hashedPassword }
		) || await AdminModel.findOneAndUpdate(
			{ email },
			{ password: hashedPassword }
		);
		console.log('User found:', user);

		if (!user) {
			console.log('User not found for:', email);
			return res.status(404).json({
				success: false,
				message: 'User not found'
			});
		}

		// Clear verification code
		verificationCodes.delete(email);
		console.log('Verification code cleared for:', email);

		res.json({
			success: true,
			message: 'Password updated successfully'
		});

		transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: 'Password Reset',
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
						.footer {
							text-align: center;
							padding: 10px;
							background-color: #DDDDDD;
						}
					</style>

					<div class="container">
						<div class="header">
							<h1>Password Reset Successful</h1>
						</div>

						<div class="content">
							<p>Hello,</p>
							<p>Your FlavourDash account password has been successfully reset.</p>

							<p><strong>Important Security Notice:</strong></p>
							<p>If you did not make this change, please contact our support team immediately.</p>

							<p>You can now log in to your account with your new password.</p>

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

		console.log('Password updated successfully for:', email);
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error resetting password'
		});
		console.error('Password reset error:', error);
	}
});

router.put('/update-password', authenticateToken, async (req, res) => {
	try {
		const { newPassword } = req.body;
		const { id, collection } = req.user;

		// Hash new password directly like in reset-password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Get user from appropriate collection
		const Model = collection === 'users' ? UserModel : AdminModel;
		const user = await Model.findByIdAndUpdate(
			id,
			{ password: hashedPassword },
			{ new: true }
		);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found'
			});
		}

		transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: user.email,
			subject: 'Password Update',
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
						.footer {
							text-align: center;
							padding: 10px;
							background-color: #DDDDDD;
						}
					</style>

					<div class="container">
						<div class="header">
							<h1>Password Reset Successful</h1>
						</div>

						<div class="content">
							<p>Hello,</p>
							<p>Your FlavourDash account password has been successfully reset.</p>

							<p><strong>Important Security Notice:</strong></p>
							<p>If you did not make this change, please contact our support team immediately.</p>

							<p>You can now log in to your account with your new password.</p>

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

		return res.json({
			success: true,
			message: 'Password updated successfully'
		});
	} catch (err) {
		console.error('Password update error:', err);
		return res.status(500).json({
			success: false,
			message: 'Server error',
			error: err.message
		});
	}
});

module.exports = router;