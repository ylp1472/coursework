const express = require('express');
const router = express.Router();
const Product = require('../models/Products');

router.get('/', async (req, res) => {
	try {
		const { query } = req.query;

		if (!query) {
			return res.status(400).json({
				message: 'Search query is required'
			});
		}

		const searchQuery = new RegExp(query, 'i');
		const products = await Product.find({
			$or: [
				{ name: searchQuery },
				{ description: searchQuery }
			]
		}).sort({
			name: 1  // Sort alphabetically
		});

		if (products.length === 0) {
			return res.status(200).json({
				message: 'No products found',
				products: []
			});
		}

		res.status(200).json({
			message: 'Products found',
			count: products.length,
			products
		});

	} catch (error) {
		res.status(500).json({
			message: 'Server error',
			error: error.message
		});
	}
});

module.exports = router;