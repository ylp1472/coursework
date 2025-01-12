import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import ReviewsSlider from "../../components/user/home/Reviews";

function FeedbackPage() {
	const [fullName, setFullName] = useState('');
	const [rating, setRating] = useState('');
	const [description, setDescription] = useState('');
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					navigate('/login');
				}

				const response = await axios.get('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/auth/user', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				setUser(response.data.user);
			} catch (err) {
				console.error('Error fetching user:', err);
			}
		};

		fetchUser();
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user) {
			alert('Please login first');
			return;
		}

		if (!rating || !description) {
			alert('Please fill all required fields');
			return;
		}

		try {
			await axios.post('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/reviews/create', {
				userId: user.id,
				fullName: user.name || fullName,
				rating,
				description,
				status: 'Not Added'
			});

			alert('Feedback submitted successfully');
			setRating('');
			setDescription('');
		} catch (err) {
			console.error('Feedback submission error:', err);
			alert('Failed to submit feedback');
		}
	};

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
					Feedback
				</h1>
			</header>

			<div className="container flex flex-col items-center justify-center gap-12 mx-auto px-8 my-14">
				<div className="h-[550px] w-full flex flex-row items-center justify-center border rounded shadow-xl">
					<div className="h-full w-2/6 bg-zinc-100 rounded-tl rounded-bl"
						style={{
							backgroundImage: `url('https://tableo.com/wp-content/uploads/2023/05/Dishes-from-around-the-world.webp')`,
							backgroundSize: 'cover'
						}}
					></div>

					<div className="h-full w-4/6 flex flex-col justify-center gap-10 px-16 py-8">
						<h2 className="text-3xl font-bold text-gray-800">
							We'd love to hear from you!
						</h2>

						<form
							onSubmit={handleSubmit}
							className="w-full flex flex-col items-center justify-center gap-10"
						>
							<div className="w-full flex flex-col items-center justify-center gap-4">
								<input
									type="text"
									id="fullName"
									name="fullName"
									value={fullName || user?.name || ''}
									onChange={(e) => setFullName(e.target.value)}
									className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
									placeholder="Full Name"
									required
								/>

								<select
									id="rating"
									name="rating"
									value={rating}
									onChange={(e) => setRating(e.target.value)}
									className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
									required
								>
									<option value="" disabled>Select a rating</option>
									<option value="0.0">0.0</option>
									<option value="0.5">0.5</option>
									<option value="1.0">1.0</option>
									<option value="1.5">1.5</option>
									<option value="2.0">2.0</option>
									<option value="2.5">2.5</option>
									<option value="3.0">3.0</option>
									<option value="3.5">3.5</option>
									<option value="4.0">4.0</option>
									<option value="4.5">4.5</option>
									<option value="5.0">5.0</option>
								</select>

								<textarea
									id="description"
									name="description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="w-full min-h-40 max-h-40 px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none resize-none"
									placeholder="Your feedback"
									required
								/>
							</div>

							<button
								type="submit"
								className="w-fit flex flex-row items-center justify-center gap-2 p-2.5 px-5 text-xs uppercase bg-red-600 hover:bg-red-500 text-white font-medium rounded transition-colors"
							>
								Submit
								<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M9 6l6 6l-6 6" />
								</svg>
							</button>
						</form>
					</div>
				</div>

				<ReviewsSlider />
			</div>

			<Footer />
		</>
	);
}

export default FeedbackPage;