import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';

import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import { useCart } from '../../contexts/CartContext';

function CheckoutPage() {
	const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
	const [isProcessing, setIsProcessing] = useState(false);
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

	// Assume LKR to USD conversion rate
	const LKR_TO_USD_RATE = 0.0034;

	const cartTotalLKR = cartItems.reduce((total, item) =>
		total + (item.price * (100 - item.discount) / 100) * item.quantity, 0
	);

	const cartTotalUSD = cartTotalLKR * LKR_TO_USD_RATE;

	// Fetch user data on component mount
	useEffect(() => {
		const fetchUserData = async () => {
			const token = localStorage.getItem('token');
			if (!token) {
				navigate('/login');
				return;
			}

			try {
				const response = await axios.get('http://localhost:8000/api/auth/user', {
					headers: { Authorization: `Bearer ${token}` }
				});

				if (response.data && response.data.user) {
					setUserData(response.data.user);
				} else {
					throw new Error('Invalid user data received');
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
				navigate('/login');
			}
		};

		fetchUserData();
	}, [navigate]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/login');
		}
	}, [navigate]);

	const createOrder = (data, actions) => {
		if (!userData) {
			throw new Error('Please log in to complete your purchase');
		}

		return actions.order.create({
			purchase_units: [{
				amount: {
					currency_code: "USD",
					value: cartTotalUSD.toFixed(2)
				},
				description: `Order from FlavourDash - ${new Date().toISOString()}`
			}]
		});
	};

	const onApprove = async (data, actions) => {
		setIsProcessing(true);
		try {
			if (!userData || !userData.id) {
				throw new Error('User data not available');
			}

			const order = await actions.order.capture();

			// Create order data with required userId
			const orderData = {
				userId: userData.id,
				email: userData.email,
				date: new Date().toISOString(),
				cart: cartItems,
				totalValue: cartTotalLKR.toFixed(2),
				totalValueUSD: cartTotalUSD.toFixed(2),
				status: 'Processing',
				paymentId: order.id,
				paymentStatus: 'completed'
			};

			// Debug log to verify data
			console.log('Creating order with data:', orderData);

			const response = await axios.post('http://localhost:8000/api/orders/create', orderData);
			console.log('Order created:', response.data);

			clearCart();
			navigate('/checkout/result?status=success');
		} catch (error) {
			console.error('Error processing payment:', error);
			console.error('User data state:', userData);
			navigate('/checkout/result?status=error');
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<>
			<Navbar />

			{isProcessing && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-xl">
						<div className="flex items-center space-x-3">
							<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
							<span className="text-gray-700">Processing payment...</span>
						</div>
					</div>
				</div>
			)}

			<header
				className="w-full bg-cover bg-center flex items-center justify-center mx-auto px-4 py-8"
				style={{
					backgroundImage: `linear-gradient(#242424A0, #242424A0), url('https://i.postimg.cc/W36Fc4D3/header.jpg')`,
					height: '400px',
				}}
			>
				<h1 className="text-6xl font-bold text-white text-center">
					Checkout
				</h1>
			</header>

			<div className="container flex flex-col items-center justify-center mx-auto px-8 my-14">
				<div className="w-full bg-zinc-100 flex flex-col items-center justify-center gap-12 p-10 rounded">
					<div className="w-full flex flex-col gap-2">
						<h2 className="text-sm text-red-600 font-medium">
							Your Cart
						</h2>
					</div>

					{cartItems.length === 0 ? (
						<p className="text-md font-medium text-gray-500">
							Your cart is empty
						</p>
					) : (
						<div className="w-full flex flex-col gap-12">
							{cartItems.map(item => (
								<div
									key={item._id}
									className="w-full flex flex-row items-center justify-between"
								>
									<div className="w-3/5 flex flex-row items-center justify-start gap-8">
										<button
											onClick={() => removeFromCart(item._id)}
											className="text-black hover:text-red-600"
										>
											<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash-x">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M4 7h16" />
												<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
												<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
												<path d="M10 12l4 4m0 -4l-4 4" />
											</svg>
										</button>

										<img src={item.image} className="w-14 h-14 object-cover rounded" alt={item.name} />

										<Link
											to={`/products/${item._id}`}
											className="text-black hover:text-red-600"
										>
											<h3 className="text-md font-medium">{item.name}</h3>
										</Link>
									</div>

									<div className="w-2/5 flex flex-row items-center justify-end gap-8">
										<div className="flex items-center">
											<button
												onClick={() => updateQuantity(item._id, item.quantity - 1)}
												className="text-red-500 hover:text-red-600 w-8 h-8 flex items-center justify-center text-xl font-medium"
											>
												-
											</button>
											<span className="min-w-8 h-6 flex items-center justify-center text-sm select-none">
												{item.quantity}
											</span>
											<button
												onClick={() => updateQuantity(item._id, item.quantity + 1)}
												className="text-red-500 hover:text-red-600 w-8 h-8 flex items-center justify-center text-xl font-medium"
											>
												+
											</button>
										</div>

										<h3 className="text-md font-medium min-w-32 text-right">
											LKR {((item.price * (100 - item.discount) / 100) * item.quantity).toFixed(2)}
										</h3>
									</div>
								</div>
							))}

							<div className="w-full flex flex-row items-center justify-between border-t border-gray-300 pt-5 mb-4">
								<h3 className="text-md font-bold">Total</h3>
								<h3 className="text-md">
									(USD {cartTotalUSD.toFixed(2)})
									<span className="font-bold ml-3">LKR {cartTotalLKR.toFixed(2)}</span>
								</h3>
							</div>

							{userData && (
								<div className="w-full flex items-center justify-end">
									<PayPalButtons
										createOrder={createOrder}
										onApprove={onApprove}
										style={{ layout: "vertical" }}
									/>
								</div>
							)}
						</div>
					)}
				</div>
			</div>

			<Footer />
		</>
	);
}

export default CheckoutPage;