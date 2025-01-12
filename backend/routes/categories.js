const router = require('express').Router();
const mongoose = require('mongoose');
const CategoryModel = require('../models/Categories');

router.post('/create', async (req, res) => {
	try {
		const category = await CategoryModel.create(req.body);
		res.status(201).json(category);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).json({ error: 'Invalid category ID' });
		}

		const category = await CategoryModel.findById(req.params.id);

		if (!category) {
			return res.status(404).json({ error: 'Category not found' });
		}

		res.status(200).json(category);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get('/', async (req, res) => {
	try {
		const { sort, limit, page } = req.query;

		// Handle count request
		if (sort === 'count') {
			const count = await CategoryModel.countDocuments({});
			return res.status(200).json({ count });
		}

		// If no pagination parameters, return all results
		if (!limit && !page) {
			const categories = await CategoryModel.find({});
			return res.status(200).json({ categories });
		}

		// Convert limit and page to numbers
		const limitNum = parseInt(limit);
		const pageNum = parseInt(page);

		// Validate pagination parameters
		if (isNaN(limitNum) || isNaN(pageNum) || limitNum <= 0 || pageNum <= 0) {
			return res.status(400).json({ error: 'Invalid pagination parameters' });
		}

		// Calculate skip value
		const skip = (pageNum - 1) * limitNum;

		// Get paginated results
		const categories = await CategoryModel.find({})
			.skip(skip)
			.limit(limitNum);

		// Get total count for pagination info
		const total = await CategoryModel.countDocuments({});

		// Return paginated results with metadata
		res.status(200).json({
			categories,
			pagination: {
				total,
				page: pageNum,
				limit: limitNum,
				pages: Math.ceil(total / limitNum)
			}
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.put('/update/:id', async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).json({ error: 'Invalid category ID' });
		}

		const category = await CategoryModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
				context: 'query'
			}
		);

		if (!category) {
			return res.status(404).json({ error: 'Category not found' });
		}

		res.status(200).json(category);
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
			return res.status(400).json({ error: 'Invalid category ID' });
		}

		const category = await CategoryModel.findByIdAndDelete(req.params.id);

		if (!category) {
			return res.status(404).json({ error: 'Category not found' });
		}

		res.status(200).json({ message: 'Category deleted successfully' });
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

module.exports = router;