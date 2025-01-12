import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import PasswordUpdateModal from '../../components/user/profile/PasswordUpdateModal';

function Profile() {
	const [user, setUser] = useState(null);
	const [userError, setUserError] = useState(null);
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/login');
		}
	}, [navigate]);

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

	const handleUpdatePassword = () => {
		setIsPasswordModalOpen(true);
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
					Profile
				</h1>
			</header>

			{user && (
				<div className="container flex flex-col items-center justify-center mx-auto gap-8 px-8 my-14">
					<div className="w-full flex flex-col items-center justify-center mx-auto px-8">
						<div className="w-full bg-zinc-100 flex flex-col items-center justify-center gap-8 p-10 rounded">
							<div className="w-full flex flex-row items-center justify-between">
								<div className="w-5/6 flex flex-col gap-2">
									<h2 className="text-sm text-red-600 font-medium">
										Profile Details
									</h2>
								</div>
							</div>

							<div className="w-full grid grid-cols-3 gap-8">
								<div className="w-full flex flex-col justify-center gap-1">
									<h4 className="text-md font-medium">Full Name:</h4>
									<p className="text-sm text-gray-600">{user.name}</p>
								</div>
								<div className="w-full flex flex-col justify-center gap-1">
									<h4 className="text-md font-medium">Email Address:</h4>
									<p className="text-sm text-gray-600">{user.email}</p>
								</div>
								<div className="w-full flex flex-col justify-center gap-1">
									<h4 className="text-md font-medium">Account Type:</h4>
									<p className="text-sm text-gray-600">{user.role}</p>
								</div>
							</div>

							{user.role === 'Admin' ? (
								<div className="w-full grid grid-cols-3 gap-8">
									<div className="w-full flex flex-col justify-center gap-1">
										<Link to="/admin" className="w-fit flex flex-row items-center justify-center gap-1 text-sm text-black hover:text-red-500 font-medium">
											Admin Dashboard
											<svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
										</Link>
									</div>
								</div>
							) : (
								<div className="w-full grid grid-cols-3 gap-8">
									<div className="w-full flex flex-col justify-center gap-1">
										<Link to="/orders" className="w-fit flex flex-row items-center justify-center gap-1 text-sm text-black hover:text-red-500 font-medium">
											View Orders
											<svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
										</Link>
									</div>
									<div className="w-full flex flex-col justify-center gap-1">
										<Link to="/reservations" className="w-fit flex flex-row items-center justify-center gap-1 text-sm text-black hover:text-red-500 font-medium">
											View Reservations
											<svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
										</Link>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="w-full flex flex-col items-center justify-center mx-auto px-8">
						<div className="w-full bg-zinc-100 flex flex-col items-center justify-center gap-8 p-10 rounded">
							<div className="w-full flex flex-row items-center justify-between">
								<div className="w-5/6 flex flex-col gap-2">
									<h2 className="text-sm text-red-600 font-medium">
										Update Password
									</h2>
								</div>
								<span className="flex items-center justify-center">
									<button
										onClick={handleUpdatePassword}
										className="text-red-500 hover:text-red-600"
									>
										<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
									</button>
								</span>
							</div>
						</div>
					</div>
				</div>
			)}

			<PasswordUpdateModal
				isOpen={isPasswordModalOpen}
				onClose={() => setIsPasswordModalOpen(false)}
			/>

			<Footer />
		</>
	);
}

export default Profile;