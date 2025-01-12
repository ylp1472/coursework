import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as DiceBear from '@dicebear/core';
import * as initialsStyle from '@dicebear/initials';
import defaultAvatar from '../../../assets/defaultAvatar.jpg';

function AdminProfileDropdown() {
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
	const profileDropdownRef = useRef(null);
	const [user, setUser] = useState(null);
	const [userAvatar, setUserAvatar] = useState('');
	const [userError, setUserError] = useState(null);
	const navigate = useNavigate();

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
				className="flex flex-row items-center gap-2 text-red-500 px-2 py-2 rounded outline-none hover:text-white hover:bg-red-500 focus:text-white focus:bg-red-500"
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
				<div className="absolute right-0 mt-2 w-48 rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
					<div className="py-1">
						<Link
							to="/"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
						>
							Home
						</Link>
						<div className="border-t border-gray-200"></div>
						<button
							onClick={() => {
								localStorage.removeItem('token');
								localStorage.removeItem('user');
								localStorage.removeItem('loggedIn');
								navigate('/login');
							}}
							className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
						>
							Logout
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default AdminProfileDropdown;