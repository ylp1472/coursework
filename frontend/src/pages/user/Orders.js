import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';

function OrdersPage() {
	const [orders, setOrders] = React.useState([]);
	const [user, setUser] = React.useState(null);
	const [userError, setUserError] = useState(null);
	const navigate = useNavigate();

	const getUser = useCallback(async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				setUserError('No authentication token found');
				return;
			}

			const response = await axios.get('http://localhost:8000/api/auth/user', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			// Access the user data from the success response
			if (response.data.success) {
				setUser(response.data.user);
			} else {
				setUserError('Failed to fetch user data');
			}
		} catch (err) {
			console.error('User fetch error:', err);
			setUserError('Error loading user data');
		}
	}, []);

	useEffect(() => {
		getUser();
	}, [getUser]);

	useEffect(() => {
		if (userError) {
			navigate('/login');
		}
	}, [userError, navigate]);

	const getOrders = useCallback(async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				setUserError('No authentication token found');
				return;
			}

			// Check if user exists before accessing user.id
			if (!user) {
				setUserError('User not found');
				return;
			}

			const response = await axios.get(`http://localhost:8000/api/orders?userId=${user.id}`);
			console.log(response.data);

			if (response.data) {
				setOrders(response.data);
			} else {
				throw new Error('Failed to fetch orders');
			}
		} catch (err) {
			console.error('Orders fetch error:', err);
			setUserError(err.message);
		}
	}, [user]);

	useEffect(() => {
		if (user) {
			getOrders();
		}
	}, [user, getOrders]);

	const formatDate = date => {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		};

		return new Date(date).toLocaleDateString('en-US', options);
	};

	const sortedOrders = [...orders].sort((a, b) => {
		return new Date(b.date) - new Date(a.date);
	});

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
					Orders
				</h1>
			</header>

			<div className="container flex flex-col items-center justify-center mx-auto px-8 my-14">
				{orders.length === 0 ? (
					<p className="w-full bg-zinc-100 text-md font-medium text-gray-500 text-center p-10 rounded">
						No orders found
					</p>
				) : (
					<div className="w-full flex flex-col gap-8">
						{sortedOrders.map(order => (
							<div
								key={order._id}
								className="w-full flex flex-col items-center justify-center mx-auto px-8"
							>
								<div className="w-full bg-zinc-100 flex flex-col items-center justify-center gap-8 p-10 rounded">
									<div className="w-full flex flex-row items-center justify-between">
										<div className="w-5/6 flex flex-col gap-2">
											<h2 className="text-sm text-red-600 font-medium">
												{formatDate(order.date)}
											</h2>
											<h3 className="text-md font-medium">
												Order ID: {order._id}
											</h3>
										</div>
										<span className="flex items-center justify-center">
											{order.status === 'Completed' ? (
												<span className="flex flex-row items-center justify-center gap-1 text-xs text-gray-600 px-2 py-1 rounded-full border border-gray-500 border-dashed bg-green-100">
													<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-checks">
														<path stroke="none" d="M0 0h24v24H0z" fill="none" />
														<path d="M7 12l5 5l10 -10" />
														<path d="M2 12l5 5m5 -5l5 -5" />
													</svg>
													{order.status}
												</span>
											) : order.status === 'Ready to Pickup' ? (
												<span className="flex flex-row items-center justify-center gap-1 text-xs text-gray-600 px-2 py-1 rounded-full border border-gray-500 border-dashed bg-yellow-100">
													<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-check">
														<path stroke="none" d="M0 0h24v24H0z" fill="none" />
														<path d="M5 12l5 5l10 -10" />
													</svg>
													{order.status}
												</span>
											) : (
												<span className="flex flex-row items-center justify-center gap-1 text-xs text-gray-600 px-2 py-1 rounded-full border border-gray-500 border-dashed bg-blue-100">
													<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-progress">
														<path stroke="none" d="M0 0h24v24H0z" fill="none" />
														<path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" />
														<path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" />
														<path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" />
														<path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" />
														<path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" />
													</svg>
													{order.status}
												</span>
											)}
										</span>
									</div>

									<div className="w-full flex flex-col gap-8">
										<div className="w-full flex flex-col items-center justify-between gap-4">
											{order.cart.map(item => (
												<div key={item._id} className="w-full flex flex-row items-center justify-between gap-8">
													<div className="w-3/5 flex flex-row items-center justify-start gap-8">
														<img src={item.image} className="w-14 h-14 object-cover rounded" alt={order.name} />

														<Link
															to={`/products/${item._id}`}
															className="text-black hover:text-red-600"
														>
															<h3 className="text-md font-medium">{item.name}</h3>
														</Link>
													</div>

													<div className="w-2/5 flex flex-row items-center justify-end gap-8">
														<div className="flex items-center">
															<span className="min-w-8 h-6 flex items-center justify-center text-sm select-none">
																x {item.quantity}
															</span>
														</div>

														<h3 className="text-md font-medium min-w-32 text-right">
															LKR {((item.price * (100 - item.discount) / 100) * item.quantity).toFixed(2)}
														</h3>
													</div>
												</div>
											))}
										</div>

										<div className="w-full flex flex-row items-center justify-between border-t border-gray-300 pt-8 mb-4">
											<h3 className="text-md font-bold">Total</h3>
											<h3 className="text-md">
												(USD {order.totalValueUSD})
												<span className="font-bold ml-3">LKR {order.totalValue}</span>
											</h3>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			<Footer />
		</>
	);
}

export default OrdersPage;