import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard';
import axios from 'axios';

function TodaysDealsSlider() {
	const [todaysDealsPage, setTodaysDealsPage] = useState(1);
	const [todaysDeals, setTodaysDeals] = useState([]);
	const [todaysDealsTotalPages, setTodaysDealsTotalPages] = useState(1);

	const fetchTodaysDeals = async (page) => {
		try {
			const response = await axios.get(`http://localhost:8000/api/products?sort=discount&limit=3&page=${page}`);
			setTodaysDeals(response.data.products);
			setTodaysDealsTotalPages(Math.ceil(response.data.pagination.total / 3));
		} catch (error) {
			console.error('Error fetching today\'s deals:', error);
		}
	};

	useEffect(() => {
		fetchTodaysDeals(todaysDealsPage);
	}, [todaysDealsPage]);

	const handleTodaysDealsNextPage = () => {
		if (todaysDealsPage < todaysDealsTotalPages) {
			setTodaysDealsPage(prev => prev + 1);
		}
	};

	const handleTodaysDealsPrevPage = () => {
		if (todaysDealsPage > 1) {
			setTodaysDealsPage(prev => prev - 1);
		}
	};

	return (
		<div className="w-full flex flex-col gap-10">
			<div className="w-full flex items-center justify-between border-b-4 border-red-500">
				<h4 className="text-3xl font-bold">Today's Deals</h4>

				<span className="flex flex-row items-center gap-1.5">
					<button
						className={todaysDealsPage === 1 ? "text-gray-300 hover:cursor-not-allowed" : "text-red-500 hover:text-red-400"}
						onClick={handleTodaysDealsPrevPage}
						disabled={todaysDealsPage === 1}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-chevron-left">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M13 15l-3 -3l3 -3" />
							<path d="M21 12a9 9 0 1 0 -18 0a9 9 0 0 0 18 0z" />
						</svg>
					</button>

					<button
						className={todaysDealsPage === todaysDealsTotalPages ? "text-gray-300 hover:cursor-not-allowed" : "text-red-500 hover:text-red-400"}
						onClick={handleTodaysDealsNextPage}
						disabled={todaysDealsPage === todaysDealsTotalPages}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-chevron-right">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M11 9l3 3l-3 3" />
							<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0z" />
						</svg>
					</button>
				</span>
			</div>

			<div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
				{todaysDeals.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</div>
	);
}

export default TodaysDealsSlider;