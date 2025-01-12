import React, { useEffect, useState } from 'react';

function NewProductModal({ isOpen, onClose, onSave }) {
	const [categories, setCategories] = useState([]);
	const [formData, setFormData] = useState({
		name: '',
		price: '',
		discount: '',
		quantity: '',
		description: '',
		foodType: '',
		category: '',
		portion: '',
		image: ''
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
		setFormData({ name: '', price: '', discount: '', quantity: '', description: '', foodType: '', category: '', portion: '', image: '' }); // Reset form
	};

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch('http://localhost:8000/api/categories');
				if (!response.ok) throw new Error('Failed to fetch categories');
				const data = await response.json();
				setCategories(data.categories);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};

		fetchCategories();
	}, []);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
			<div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded bg-white">
				<div className="w-full flex flex-col items-center justify-center gap-8">
					<h3 className="text-lg font-semibold text-black">
						Create New Product
					</h3>

					<form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-10">
						<div className="w-full flex flex-col items-center justify-center gap-5">
							<span className="w-full flex flex-col items-center justify-center gap-2.5">
								<label htmlFor="name" className="w-full text-xs text-gray-500">
									Name:
								</label>
								<input
									id="name"
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
									required
								/>
							</span>

							<span className="w-full flex flex-col items-center justify-center gap-2.5">
								<label htmlFor="price" className="w-full text-xs text-gray-500">
									Price:
								</label>
								<input
									id="price"
									type="text"
									name="price"
									value={formData.price}
									onChange={handleChange}
									className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
									required
								/>
							</span>

							<span className="w-full flex flex-col items-center justify-center gap-2.5">
								<label htmlFor="discount" className="w-full text-xs text-gray-500">
									Discount:
								</label>
								<input
									id="discount"
									type="number"
									name="discount"
									value={formData.discount}
									onChange={handleChange}
									className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
									required
								/>
							</span>

							<span className="w-full flex flex-col items-center justify-center gap-2.5">
								<label htmlFor="quantity" className="w-full text-xs text-gray-500">
									Quantity:
								</label>
								<input
									id="quantity"
									type="number"
									name="quantity"
									value={formData.quantity}
									onChange={handleChange}
									className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
									required
								/>
							</span>

							<span className="w-full flex flex-col items-center justify-center gap-2.5">
								<label htmlFor="description" className="w-full text-xs text-gray-500">
									Description:
								</label>
								<input
									id="description"
									type="text"
									name="description"
									value={formData.description}
									onChange={handleChange}
									className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
									required
								/>
							</span>

							<span className="w-full flex flex-col items-center justify-center gap-2.5">
								<label htmlFor="foodType" className="w-full text-xs text-gray-500">
									Food Type:
								</label>
								<select
									id="foodType"
									name="foodType"
									value={formData.foodType}
									onChange={handleChange}
									className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
								>
									<option value="">Select a food type</option>
									<option value="Vegetarian">Vegetarian</option>
									<option value="Non-Vegetarian">Non-Vegetarian</option>
								</select>
							</span>

							<span className="w-full flex flex-col items-center justify-center gap-2.5">
								<label htmlFor="category" className="w-full text-xs text-gray-500">
									Category:
								</label>
								<select
									id="category"
									name="category"
									value={formData.category}
									onChange={handleChange}
									className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
								>
									<option value="">Select a category</option>
									{categories.map((category) => (
										<option key={category._id} value={category._id}>
											{category.name}
										</option>
									))}
								</select>
							</span>

							<span className="w-full flex flex-col items-center justify-center gap-2.5">
								<label htmlFor="portion" className="w-full text-xs text-gray-500">
									Portion:
								</label>
								<input
									id="portion"
									type="text"
									name="portion"
									value={formData.portion}
									onChange={handleChange}
									className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
									required
								/>
							</span>

							<span className="w-full flex flex-col items-center justify-center gap-2.5">
								<label htmlFor="image" className="w-full text-xs text-gray-500">
									Image URL:
								</label>
								<input
									id="image"
									type="url"
									name="image"
									value={formData.image}
									onChange={handleChange}
									className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
									required
								/>
							</span>
						</div>

						<div className="w-full flex flex-row items-center justify-center gap-4">
							<button
								type="button"
								onClick={onClose}
								className="text-xs text-white px-4 py-2 rounded outline-none bg-gray-500 hover:bg-gray-400 focus:bg-gray-400"
							>
								Cancel
							</button>

							<button
								type="submit"
								className="text-xs text-white px-4 py-2 rounded outline-none bg-red-500 hover:bg-red-400 focus:bg-red-400"
							>
								Create Product
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default NewProductModal;