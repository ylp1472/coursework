import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as DiceBear from '@dicebear/core';
import * as initialsStyle from '@dicebear/initials';
import defaultAvatar from '../../../assets/defaultAvatar.jpg';

function ProfileDropdown() {
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
	const profileDropdownRef = useRef(null);
	const [user, setUser] = useState(null);
	const [userAvatar, setUserAvatar] = useState('');
	const [userError, setUserError] = useState(null);

	useEffect(() => {
		if (user && user.name) {
			try {
				const avatar = DiceBear.createAvatar(initialsStyle, {
					seed: user.name,
					fontSize: 36,
					textColor: ['FFFFFF'],
					backgroundColor: ['FF5D5D'],
					backgroundType: ["solid"]
				});

				const svg = avatar.toString();

				const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
				setUserAvatar(dataUri);
			} catch (error) {
				console.error('Error creating avatar:', error);
			}
		}
	}, [user]);

	const getUser = useCallback(async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				setUserError('No authentication token found');
				return;
			}

			const response = await axios.get('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/auth/user', {
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
		const handleClickOutside = (event) => {
			if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
				setIsProfileDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={profileDropdownRef}>
			<button
				onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
				className="flex flex-row items-center gap-2 text-white px-2 py-2 rounded outline-none hover:bg-red-500 focus:bg-red-500"
			>
				{userError && (
					<img src={defaultAvatar} className="h-6 w-6 rounded-full" alt="User avatar" />
				)}
				{user && (
					<img src={userAvatar} className="h-6 w-6 rounded-full" alt={`${user.name}'s avatar`} />
				)}
				<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-chevron-down transform transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`}>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M6 9l6 6l6 -6" />
				</svg>
			</button>

			{isProfileDropdownOpen && (
				<div className="absolute right-0 mt-2 w-[250px] rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
					<div className="py-1">
						{user && (
							<>
								<Link
									to="/profile"
									className="flex flex-row items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-white"
								>
									<img
										src={userAvatar}
										className="h-8 w-8 rounded-full border-2 border-white"
										alt={`${user.name}'s Avatar`}
									/>
									<div className="flex flex-col gap-0.5 w-full text-gray-700">
										<span className="block text-sm font-semibold truncate">{user.name}</span>
										<span className="text-xs font-normal text-gray-500">View Profile</span>
									</div>
								</Link>
								<div className="border-t border-gray-200"></div>
								{user.role === 'Admin' ? (
									<>
										<Link
											to="/admin"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
										>
											Admin Dashboard
										</Link>
									</>
								) : (
									<>
										<Link
											to="/orders"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
										>
											Orders
										</Link>
										<Link
											to="/reservations"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
										>
											Reservations
										</Link>
										<div className="border-t border-gray-200"></div>
										<Link
											to="/feedback"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
										>
											Feedback
										</Link>
										<Link
											to="/helpcenter"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
										>
											Help Center
										</Link>
										<a
											href="/helpchat"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
										>
											Help Chat
										</a>
									</>
								)}
								<div className="border-t border-gray-200"></div>
								<button
									onClick={() => {
										localStorage.removeItem('token');
										localStorage.removeItem('role');
										window.location.href = '/login';
									}}
									className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
								>
									Logout
								</button>
							</>
						)}

						{userError && (
							<>
								<Link
									to="/helpcenter"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
								>
									Help Center
								</Link>
								<div className="border-t border-gray-200"></div>
								<Link
									to="/register"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
								>
									Register
								</Link>
								<Link
									to="/login"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
								>
									Login
								</Link>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default ProfileDropdown;