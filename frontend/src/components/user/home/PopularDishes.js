import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard';
import axios from 'axios';

function PopularDishesSlider() {
	const [popularDishesPage, setPopularDishesPage] = useState(1);
	const [popularDishes, setPopularDishes] = useState([]);
	const [popularDishesTotalPages, setpopularDishesTotalPages] = useState(1);

	const fetchPopularDishes = async (page) => {
		try {
			const response = await axios.get(`http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/products?limit=4&page=${page}`);
			setPopularDishes(response.data.products);
			setpopularDishesTotalPages(Math.ceil(response.data.pagination.total / 4));
		} catch (error) {
			console.error('Error fetching popular dishes:', error);
		}
	};

	useEffect(() => {
		fetchPopularDishes(popularDishesPage);
	}, [popularDishesPage]);

	const handlePopularDishesNextPage = () => {
		if (popularDishesPage < popularDishesTotalPages) {
			setPopularDishesPage(prev => prev + 1);
		}
	};

	const handlePopularDishesPrevPage = () => {
		if (popularDishesPage > 1) {
			setPopularDishesPage(prev => prev - 1);
		}
	};

	return (
		<div className="container flex flex-col items-center justify-center gap-10 mx-auto px-8 py-14">
			<div className="w-full flex items-center justify-between border-b-4 border-red-500">
				<h4 className="text-3xl font-bold">Popular Dishes</h4>

				<span className="flex flex-row items-center gap-1.5">
					<button
						className={popularDishesPage === 1 ? "text-gray-300 hover:cursor-not-allowed" : "text-red-500 hover:text-red-400"}
						onClick={handlePopularDishesPrevPage}
						disabled={popularDishesPage === 1}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-chevron-left">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M13 15l-3 -3l3 -3" />
							<path d="M21 12a9 9 0 1 0 -18 0a9 9 0 0 0 18 0z" />
						</svg>
					</button>

					<button
						className={popularDishesPage === popularDishesTotalPages ? "text-gray-300 hover:cursor-not-allowed" : "text-red-500 hover:text-red-400"}
						onClick={handlePopularDishesNextPage}
						disabled={popularDishesPage === popularDishesTotalPages}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-chevron-right">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M11 9l3 3l-3 3" />
							<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0z" />
						</svg>
					</button>
				</span>
			</div>

			<div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{popularDishes.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</div>
	);
}

export default PopularDishesSlider;