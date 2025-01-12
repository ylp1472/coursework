import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CategoriesSlider() {
	const [categoriesForSliderPage, setCategoriesForSliderPage] = useState(1);
	const [categoriesForSlider, setCategoriesForSlider] = useState([]);
	const [categoriesForSliderTotalPages, setCategoriesForSliderTotalPages] = useState(1);

	const fetchCategoriesForSlider = async (page) => {
		try {
			const response = await axios.get(`http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/categories?limit=5&page=${page}`);
			setCategoriesForSlider(response.data.categories);
			setCategoriesForSliderTotalPages(Math.ceil(response.data.pagination.total / 5));
		} catch (error) {
			console.error('Error fetching categories for slider:', error);
		}
	};

	const handleCategoriesForSliderNextPage = () => {
		if (categoriesForSliderPage < categoriesForSliderTotalPages) {
			setCategoriesForSliderPage(prev => prev + 1);
		}
	};

	const handleCategoriesForSliderPrevPage = () => {
		if (categoriesForSliderPage > 1) {
			setCategoriesForSliderPage(prev => prev - 1);
		}
	};

	useEffect(() => {
		fetchCategoriesForSlider(categoriesForSliderPage);
	}, [categoriesForSliderPage]);

	return (
		<div className="w-full flex flex-col gap-10">
			<div className="w-full flex items-center justify-between border-b-4 border-red-500">
				<h4 className="text-3xl font-bold">Categories</h4>

				<span className="flex flex-row items-center gap-1.5">
					<button
						className={categoriesForSliderPage === 1 ? "text-gray-300 hover:cursor-not-allowed" : "text-red-500 hover:text-red-400"}
						onClick={handleCategoriesForSliderPrevPage}
						disabled={categoriesForSliderPage === 1}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-chevron-left">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M13 15l-3 -3l3 -3" />
							<path d="M21 12a9 9 0 1 0 -18 0a9 9 0 0 0 18 0z" />
						</svg>
					</button>

					<button
						className={categoriesForSliderPage === categoriesForSliderTotalPages ? "text-gray-300 hover:cursor-not-allowed" : "text-red-500 hover:text-red-400"}
						onClick={handleCategoriesForSliderNextPage}
						disabled={categoriesForSliderPage === categoriesForSliderTotalPages}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-chevron-right">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M11 9l3 3l-3 3" />
							<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0z" />
						</svg>
					</button>
				</span>
			</div>

			<div className="w-full grid grid-cols-1 gap-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
				{categoriesForSlider.map((category) => (
					<div
						key={category._id}
					>
						<Link to={`/categories/${category._id}`}
							className="w-full flex flex-col items-center justify-center gap-4 text-black font-semibold text-lg"
						>
							<img
								src={category.image}
								alt={category.name}
								className="w-full aspect-square object-cover object-center border rounded-full grayscale-[0.3] hover:grayscale-[0] hover:shadow-xl duration-200"
							/>

							{category.name}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

export default CategoriesSlider;