const router = require('express').Router();
const mongoose = require('mongoose');
const ProductModel = require('../models/Products');

router.post('/create', async (req, res) => {
	try {
		const product = await ProductModel.create(req.body);
		res.status(201).json(product);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).json({ error: 'Invalid product ID' });
		}

		const product = await ProductModel.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}

		res.status(200).json(product);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get('/', async (req, res) => {
	try {
		const { sort, category, limit, page } = req.query;

		// Handle count request
		if (sort === 'count') {
			const query = category ? { category } : {};
			const count = await ProductModel.countDocuments(query);
			return res.status(200).json({ count });
		}

		// Base query with optional category filter
		let query = category ? { category } : {};

		// Add discount filter if sort=discount
		if (sort === 'discount') {
			query = {
				...query,
				discount: { $gt: 0 }
			};
		}

		// If no pagination parameters, return all results
		if (!limit && !page) {
			const products = await ProductModel.find(query)
				.sort(sort === 'discount' ? { discount: -1 } : {});
			return res.status(200).json({ products });
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

		// Get paginated results with optional sorting
		const products = await ProductModel.find(query)
			.sort(sort === 'discount' ? {
				discount: -1,
				price: -1,
				_id: 1
			} : {})
			.skip(skip)
			.limit(limitNum);

		// Get total count for pagination info
		const total = await ProductModel.countDocuments(query);

		// Return paginated results with metadata
		res.status(200).json({
			products,
			pagination: {
				total,
				page: pageNum,
				limit: limitNum,
				pages: Math.ceil(total / limitNum)
			}
		});

	} catch (err) {
		console.error('Error fetching products:', err);
		res.status(500).json({ error: err.message });
	}
});

router.put('/update/:id', async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).json({ error: 'Invalid product ID' });
		}

		const product = await ProductModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
				context: 'query'
			}
		);

		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}

		res.status(200).json(product);
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
			return res.status(400).json({ error: 'Invalid product ID' });
		}

		const product = await ProductModel.findByIdAndDelete(req.params.id);

		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}

		res.status(200).json({ message: 'Product deleted successfully' });
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

module.exports = router;