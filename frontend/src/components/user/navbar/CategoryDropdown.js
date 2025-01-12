import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CategoryDropdown() {
	const categoryDropdownRef = useRef(null);
	const [categories, setCategories] = useState([]);
	const [categoryProducts, setCategoryProducts] = useState({});
	const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get('http://localhost:8000/api/categories');
				const data = response.data.categories;
				setCategories(data);

				// Fetch products for each category
				await Promise.all(
					data.map(async (category) => {
						const productsResponse = await axios.get(
							`http://localhost:8000/api/products?category=${category._id}`
						);
						setCategoryProducts(prev => ({
							...prev,
							[category._id]: productsResponse.data.products
						}));
					})
				);
			} catch (err) {
				console.error(err.message);
			}
		};

		fetchCategories();
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
				setIsCategoryDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={categoryDropdownRef}>
			<button
				onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
				className="flex flex-row items-center gap-2 text-white text-xs px-4 py-2 rounded outline-none hover:bg-red-500 focus:bg-red-500"
			>
				Menu
				<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-chevron-down transform transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M6 9l6 6l6 -6" />
				</svg>
			</button>

			{isCategoryDropdownOpen && (
				<div className="absolute mt-2 w-[600px] max-h-[350px] rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-auto z-50">
					<div className="w-full grid grid-cols-3 gap-x-8 gap-y-8 items-start p-5">
						{categories.map((category) => (
							<span key={category._id} className="w-full flex flex-row items-center gap-3">
								<span className="w-full flex flex-col gap-2">
									<span className="w-full flex flex-row items-center gap-2">
										<img src={category.image} className="h-5 w-5 rounded-full" alt={category.name} />

										<Link
											to={`/categories/${category._id}`}
											className="flex items-center text-sm font-semibold text-gray-700 hover:text-red-500"
										>
											{category.name}
										</Link>
									</span>

									<div className="w-full h-0.5 my-1 bg-gray-100"></div>

									<div className="w-full grid grid-cols-1 gap-3">
										{categoryProducts[category._id]?.map((product) => (
											<Link
												key={product._id}
												to={`/products/${product._id}`}
												title={product.name}
												className="w-full flex flex-row items-center justify-between text-xs text-gray-600 hover:text-red-500"
											>
												<span className="block truncate w-5/6">
													{product.name}
												</span>

												<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
													<path stroke="none" d="M0 0h24v24H0z" fill="none" />
													<path d="M9 6l6 6l-6 6" />
												</svg>
											</Link>
										))}
									</div>
								</span>
							</span>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default CategoryDropdown;