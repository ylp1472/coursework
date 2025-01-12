import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import RedLogo from '../../assets/logo-red.svg';

function CheckoutResultPage() {
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/login');
		}
	}, [navigate]);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const status = params.get('status');

		if (status === 'success') {
			setMessage('Order Placed Successfully');
		} else if (status === 'error') {
			setError('Failed to place order');
		}
	}, []);

	return (
		<>
			<div className="flex flex-col min-h-screen">
				<Navbar />

				<main
					className="flex-grow bg-gray-100 flex items-center justify-center px-4 py-12"
					style={{
						minHeight: 'calc(100vh - 5rem)'
					}}
				>
					<div className="max-w-2xl w-full bg-white shadow-lg rounded">
						<div className="p-8 py-16 text-center h-full flex flex-col items-center justify-center gap-10">
							{message && (
								<>
									<Link
										to="/"
										className="w-fit"
									>
										<img src={RedLogo} className="h-10" alt="logo" />
									</Link>
									<div className="flex flex-row items-center justify-center gap-2 text-green-600">
										<svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>
										<h1 className="text-lg font-semibold text-gray-800">Order Placed Successfully</h1>
									</div>
									<div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
										<Link
											to="/"
											className="flex flex-row items-center justify-center gap-3 px-10 text-xs uppercase bg-red-600 hover:bg-red-500 text-white font-medium p-2.5 rounded"
										>
											Continue Shopping
											<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M9 6l6 6l-6 6" />
											</svg>
										</Link>
									</div>
								</>
							)}

							{error && (
								<>
									<Link
										to="/"
										className="w-fit"
									>
										<img src={RedLogo} className="h-10" alt="logo" />
									</Link>
									<div className="flex flex-row items-center justify-center gap-2 text-red-600">
										<svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-exclamation-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-5 11.66a1 1 0 0 0 -1 1v.01a1 1 0 0 0 2 0v-.01a1 1 0 0 0 -1 -1m0 -7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0 -1 -1" /></svg>
										<h1 className="text-lg font-semibold text-gray-800">Failed to Place Order</h1>
									</div>
									<div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
										<Link
											to="/checkout"
											className="flex flex-row items-center justify-center gap-3 px-10 text-xs uppercase bg-red-600 hover:bg-red-500 text-white font-medium p-2.5 rounded"
										>
											Try Again
											<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M9 6l6 6l-6 6" />
											</svg>
										</Link>
										<Link
											to="/helpcenter"
											className="flex flex-row items-center justify-center gap-3 px-10 text-xs uppercase bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium p-2.5 rounded"
										>
											Visit Help Center
											<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M9 6l6 6l-6 6" />
											</svg>
										</Link>
									</div>
								</>
							)}
						</div>
					</div>
				</main>
			</div>

			<Footer />
		</>
	);
}

export default CheckoutResultPage;