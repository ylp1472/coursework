import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";

function ReservationsPage() {
	const [reservations, setReservations] = useState([]);
	const [user, setUser] = useState(null);
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

	const getReservations = useCallback(async () => {
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

			const response = await axios.get(`http://localhost:8000/api/reservations?userId=${user.id}`);
			console.log(response.data);

			if (response.data) {
				setReservations(response.data);
			} else {
				throw new Error('Failed to fetch reservations');
			}
		} catch (err) {
			console.error('Reservations fetch error:', err);
			setUserError(err.message);
		}
	}, [user]);

	useEffect(() => {
		if (user) {
			getReservations();
		}
	}, [user, getReservations]);

	const sortedReservations = [...reservations].sort((a, b) => {
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
					Reservations
				</h1>
			</header>

			<div className="container flex flex-col items-center justify-center mx-auto px-8 my-14">
				{reservations.length === 0 ? (
					<p className="w-full bg-zinc-100 text-md font-medium text-gray-500 text-center p-10 rounded">
						No reservations found
					</p>
				) : (
					<div className="w-full flex flex-col gap-8">
						{sortedReservations.map(reservation => (
							<div
								key={reservation._id}
								className="w-full flex flex-col items-center justify-center mx-auto px-8"
							>
								<div className="w-full bg-zinc-100 flex flex-col items-center justify-center gap-8 p-10 rounded">
									<div className="w-full flex flex-row items-center justify-between">
										<div className="w-5/6 flex flex-col gap-2">
											<h2 className="text-sm text-red-600 font-medium">
												{reservation.date}
											</h2>
											<h3 className="text-md font-medium">
												Reservation ID: {reservation._id}
											</h3>
										</div>
										<span className="flex items-center justify-center">
											{reservation.status === 'Declined' ? (
												<span className="h-full w-full flex flex-row items-center justify-center gap-2">
													<span className="flex flex-row items-center justify-center gap-1 text-xs text-gray-600 px-2 py-1 rounded-full border border-gray-500 border-dashed bg-red-100">
														<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x">
															<path stroke="none" d="M0 0h24v24H0z" fill="none" />
															<path d="M18 6l-12 12" />
															<path d="M6 6l12 12" />
														</svg>
														Declined
													</span>
												</span>
											) : (
												<span className="h-full w-full flex flex-row items-center justify-center gap-2">
													<span className="flex flex-row items-center justify-center gap-1 text-xs text-gray-600 px-2 py-1 rounded-full border border-gray-500 border-dashed bg-green-100">
														<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-check">
															<path stroke="none" d="M0 0h24v24H0z" fill="none" />
															<path d="M5 12l5 5l10 -10" />
														</svg>
														Approved
													</span>
												</span>
											)}
										</span>
									</div>

									<div className="w-full grid grid-cols-3 gap-8">
										<div className="w-full flex flex-col justify-center gap-1">
											<h4 className="text-md font-medium">Email:</h4>
											<p className="text-sm text-gray-600">{reservation.email}</p>
										</div>
										<div className="w-full flex flex-col justify-center gap-1">
											<h4 className="text-md font-medium">Phone:</h4>
											<p className="text-sm text-gray-600">{reservation.phone}</p>
										</div>
										<div className="w-full flex flex-col justify-center gap-1">
											<h4 className="text-md font-medium">Person Count:</h4>
											<p className="text-sm text-gray-600">{reservation.personCount}</p>
										</div>
										<div className="w-full flex flex-col justify-center gap-1">
											<h4 className="text-md font-medium">Start Time:</h4>
											<p className="text-sm text-gray-600">{reservation.startTime}</p>
										</div>
										<div className="w-full flex flex-col justify-center gap-1">
											<h4 className="text-md font-medium">End Time:</h4>
											<p className="text-sm text-gray-600">{reservation.endTime}</p>
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

export default ReservationsPage;