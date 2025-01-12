import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';

function AllCategoriesPage() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get('http://localhost:8000/api/categories');
				setCategories(response.data.categories);
			} catch (err) {
				console.error('Error fetching categories:', err);
			}
		};

		fetchCategories();
	}, []);

	return (
		<>
			<Navbar />

			<header
				className="w-full bg-cover bg-center flex items-center justify-center mx-auto px-4 py-8"
				style={{
					backgroundImage: `linear-gradient(#242424A0, #242424A0), url('https://i.postimg.cc/W36Fc4D3/header.jpg')`,
					height: '400px',
				}}
			>
				<h1 className="text-6xl font-bold text-white text-center">
					All Categories
				</h1>
			</header>

			<div className="container flex flex-col items-center justify-center mx-auto px-8 my-14">
				{categories.length === 0 ? (
					<p className="w-full bg-zinc-100 text-md font-medium text-gray-500 text-center p-10 rounded">
						No categories found
					</p>
				) : (
					<div className="grid grid-cols-5 gap-6">
						{categories && categories.map((category) => (
							<Link to={`/categories/${category._id}`}
								key={category._id}
								className="w-full flex flex-col items-center justify-center text-black hover:text-white border bg-gray-100 hover:bg-red-500 bg-cover bg-center rounded hover:shadow-xl duration-200"
							>
								<img
									src={category.image}
									alt={category.name}
									className="w-full aspect-square object-cover object-center rounded-t grayscale-[0.3] hover:grayscale-[0] duration-200"
								/>

								<div className="w-full flex flex-row items-center justify-between gap-0.5 text-md font-semibold p-6">
									{category.name}

									<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M9 6l6 6l-6 6" />
									</svg>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>

			<Footer />
		</>
	)
}

export default AllCategoriesPage;