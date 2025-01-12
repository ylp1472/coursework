import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';

import axios from 'axios';

const HelpCenter = () => {
	const [email, setEmail] = useState('');
	const [subject, setSubject] = useState('');
	const [description, setDescription] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					throw new Error('Please login first');
				}

				const response = await axios.get('http://localhost:8000/api/auth/user', {
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
	}, []);

	const helpTopics = [
		{
			id: 1,
			topic: "Orders & Tracking",
			heading: "Viewing and Tracking Orders",
			link: "/helpcenter/article1"
		},
		{
			id: 2,
			topic: "Payment Issues",
			heading: "Troubleshooting Payment Issues",
			link: "/helpcenter/article2"
		},
		{
			id: 3,
			topic: "Promotions & Discounts",
			heading: "How to Apply Promo Codes and Discounts",
			link: "/helpcenter/article3"
		},
		{
			id: 4,
			topic: "Orders & Tracking",
			heading: "Understanding Order Statuses",
			link: "/helpcenter/article4"
		},
		{
			id: 5,
			topic: "Order Changes",
			heading: "How to Cancel or Modify an Order",
			link: "/helpcenter/article5"
		},
		{
			id: 6,
			topic: "Account Management",
			heading: "How to Create an Account and Log In",
			link: "/helpcenter/article6"
		},
		{
			id: 7,
			topic: "Account Management",
			heading: "Troubleshooting Login Issues",
			link: "/helpcenter/article7"
		},
		{
			id: 8,
			topic: "Account Management",
			heading: "How to Update Account Information",
			link: "/helpcenter/article8"
		},
		{
			id: 9,
			topic: "Account Management",
			heading: "How to Reset Password",
			link: "/helpcenter/article9"
		},
		{
			id: 10,
			topic: "Account Management",
			heading: "Understanding Account Types",
			link: "/helpcenter/article10"
		}
	];

	const handleSubmit = (e) => {
		e.preventDefault();

		const response = axios.post('http://localhost:8000/api/tickets/create', {
			email: email || user?.email,
			subject,
			description,
			date: new Date(),
			status: 'Open',
		});

		console.log(response.data);
		alert('Ticket submitted successfully');
		setEmail('');
		setSubject('');
		setDescription('');
	};

	return (
		<div className="flex flex-col min-h-screen bg-gray-100">
			<Navbar />

			{/* Header Section */}
			<header
				className="w-full bg-cover bg-center flex items-center justify-center mx-auto px-4 py-8"
				style={{
					backgroundImage: `linear-gradient(#242424A0, #242424A0), url('https://i.postimg.cc/W36Fc4D3/header.jpg')`,
					height: '400px',
				}}
			>
				<h1 className="text-6xl font-bold text-white text-center">
					Help Center
				</h1>
			</header>

			{/* Content */}
			<div className="flex-grow relative">
				<main className="container mx-auto px-4 py-8 max-w-4xl">
					{/* Help Topics */}
					<div className="space-y-4 mb-16">
						{helpTopics.map((topic) => (
							<div
								key={topic.id}
								className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
							>
								<Link
									to={topic.link}
									className="p-6 flex items-center justify-between group"
								>
									<div className="flex-grow">
										<p className="text-sm text-red-600 mb-1">Related Topic</p>
										<h2 className="text-lg font-semibold text-gray-900">{topic.heading}</h2>
									</div>
									<div className="flex-shrink-0 ml-4">
										<svg
											className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M7 17L17 7" />
											<path d="M7 7h10v10" />
										</svg>
									</div>
								</Link>
							</div>
						))}
					</div>

					{/* Contact Form */}
					<div className="mt-12">
						<h2 className="text-2xl font-semibold text-red-600 text-center mb-8">
							Issue Not Listed? Send a Message
						</h2>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									value={email || user?.email || ''}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="subject"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Subject
								</label>
								<select
									id="subject"
									value={subject}
									onChange={(e) => setSubject(e.target.value)}
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
									required
								>
									<option value="" disabled>Select a Subject</option>
									<option value="Order Issue">Order Issue</option>
									<option value="Payment Issue">Payment Issue</option>
									<option value="Promotion Issue">Promotion Issue</option>
									<option value="Account Issue">Account Issue</option>
									<option value="Other">Other</option>
								</select>
							</div>
							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Message
								</label>
								<textarea
									id="message"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									rows={6}
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
									required
								/>
							</div>
							<div className="flex justify-center">
								<button
									type="submit"
									className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</main>
			</div>

			<Footer />
		</div>
	);
};

export default HelpCenter;