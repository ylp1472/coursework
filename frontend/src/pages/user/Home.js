import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import ReservationForm from '../../components/user/home/ReservationForm';
import CategoriesSlider from '../../components/user/home/Categories';
import TodaysDealsSlider from '../../components/user/home/TodaysDeals';
import PopularDishesSlider from '../../components/user/home/PopularDishes';
import ReviewsSlider from '../../components/user/home/Reviews';

function HomePage() {
	const [greeting, setGreeting] = useState('');

	const fetchGreeting = useCallback(async () => {
		try {
			const time = new Date().getHours();
			if (time < 12) {
				setGreeting('Good Morning');
			} else if (time < 18) {
				setGreeting('Good Afternoon');
			} else {
				setGreeting('Good Evening');
			}
		} catch (error) {
			console.error('Error fetching greeting:', error);
		}
	}, []);

	useEffect(() => {
		fetchGreeting();
	}, [fetchGreeting]);

	return (
		<>
			<Navbar />

			<header
				className="w-full h-full flex flex-col gap-1.5 items-center justify-center text-white bg-cover bg-center"
				style={{
					backgroundImage: `linear-gradient(#242424A0, #242424A0), url('https://i.postimg.cc/W36Fc4D3/header.jpg')`,
					height: '400px',
				}}
			>
				<h2 className="text-2xl font-semibold">{greeting},</h2>
				<h3 className="text-4xl font-extrabold">What do you want to eat today?</h3>
			</header>

			<div className="w-full container flex flex-row justify-center gap-14 mx-auto px-8 py-14">
				<div className="w-2/6 flex flex-col gap-12">
					{/* Reservation Form */}
					<ReservationForm />
				</div>

				<div className="w-4/6 flex flex-col gap-14">
					{/* Categories */}
					<CategoriesSlider />

					{/* Today's Deals */}
					<TodaysDealsSlider />
				</div>
			</div>

			{/* Popular Dishes */}
			<PopularDishesSlider />

			{/* Testimonials */}
			<ReviewsSlider />

			{/* Explore Menu Card */}
			<div className="container flex flex-col items-center justify-center mx-auto px-8 my-14">
				<div
					className="w-full h-full flex flex-col gap-8 text-white bg-cover bg-center p-12 rounded"
					style={{
						backgroundImage: `linear-gradient(90deg, #242424, #242424E0, #242424A0), url('https://recipesblob.oetker.in/assets/d8a4b00c292a43adbb9f96798e028f01/1272x764/pizza-pollo-arrostojpg.webp')`,
					}}
				>
					<h4 className="text-3xl font-bold">
						Explore Our Menu with Variety of Food Items,<br />
						Curated Just for You
					</h4>

					<Link
						to={`/categories`}
						className="w-fit flex flex-row items-center justify-center gap-3 px-10 text-xs uppercase bg-red-600 hover:bg-red-500 text-white font-medium p-2.5 rounded transition-colors"
					>
						Explore
						<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M9 6l6 6l-6 6" />
						</svg>
					</Link>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default HomePage;