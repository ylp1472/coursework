const router = require('express').Router();
const mongoose = require('mongoose');
const AdminModel = require('../models/Admins');

router.post('/create', async (req, res) => {
	try {
		const admin = await AdminModel.create(req.body);
		res.status(201).json(admin);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.get('/', async (req, res) => {
	try {
		const { sort } = req.query;

		if (sort === 'count') {
			const count = await AdminModel.countDocuments({});
			return res.status(200).json({ count });
		}

		const admins = await AdminModel.find({})
			.select('-password'); // Exclude password from the response
		res.status(200).json(admins);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.put('/update/:id', async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).json({ error: 'Invalid admin ID' });
		}

		// Remove password from update if it exists
		const { password, ...updateData } = req.body;

		const admin = await AdminModel.findByIdAndUpdate(
			req.params.id,
			updateData,
			{
				new: true,
				runValidators: true,
				context: 'query'
			}
		).select('-password');

		if (!admin) {
			return res.status(404).json({ error: 'Admin not found' });
		}

		res.status(200).json(admin);
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
			return res.status(400).json({ error: 'Invalid admin ID' });
		}

		const admin = await AdminModel.findByIdAndDelete(req.params.id);

		if (!admin) {
			return res.status(404).json({ error: 'Admin not found' });
		}

		res.status(200).json({ message: 'Admin deleted successfully' });
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

module.exports = router;