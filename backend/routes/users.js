const router = require('express').Router();
const mongoose = require('mongoose');
const UserModel = require('../models/Users');

// User Routes
router.post('/create', async (req, res) => {
	try {
		const user = await UserModel.create(req.body);
		res.status(201).json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.get('/', async (req, res) => {
	try {
		const { sort } = req.query;

		if (sort === 'count') {
			const count = await UserModel.countDocuments({});
			return res.status(200).json({ count });
		}

		const users = await UserModel.find({})
			.select('-password'); // Exclude password from the response
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.put('/update/:id', async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).json({ error: 'Invalid user ID' });
		}

		// Remove password from update if it exists
		const { password, ...updateData } = req.body;

		const user = await UserModel.findByIdAndUpdate(
			req.params.id,
			updateData,
			{
				new: true,
				runValidators: true,
				context: 'query'
			}
		).select('-password');

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.status(200).json(user);
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
			return res.status(400).json({ error: 'Invalid user ID' });
		}

		const user = await UserModel.findByIdAndDelete(req.params.id);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.status(200).json({ message: 'User deleted successfully' });
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});


module.exports = router;