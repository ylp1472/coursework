import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

function NotificationDropdown() {
	const [user, setUser] = useState(null);
	const [userError, setUserError] = useState(null);
	const [notifications, setNotifications] = useState([]);
	const [notificationsError, setNotificationsError] = useState(null);
	const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
	const notificationDropdownRef = useRef(null);

	const getUser = useCallback(async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				setUserError('No authentication token found');
				return;
			}

			const response = await axios.get('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/auth/user', {
				headers: { Authorization: `Bearer ${token}` }
			});

			if (response.data.success) {
				setUser(response.data.user);
			}
		} catch (err) {
			console.error('User fetch error:', err);
			setUserError('Error loading user data');
		}
	}, []);

	useEffect(() => {
		getUser();
	}, [getUser]);

	const handleBellClick = async () => {
		setIsNotificationDropdownOpen(!isNotificationDropdownOpen);

		if (!isNotificationDropdownOpen && user?.id) {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get(
					`http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/notifications/user/${user.id}`,
					{
						headers: { Authorization: `Bearer ${token}` }
					}
				);
				setNotifications(response.data);
				setNotificationsError(null);
			} catch (err) {
				console.error('Notifications fetch error:', err);
				setNotificationsError('Failed to load notifications');
			}
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
				setIsNotificationDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<>
			{user && (
				<div className="relative" ref={notificationDropdownRef}>
					<button
						onClick={handleBellClick}
						className="flex items-start text-white px-2 py-2 rounded outline-none hover:bg-red-500 focus:bg-red-500"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bell">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
							<path d="M9 17v1a3 3 0 0 0 6 0v-1" />
						</svg>
					</button>

					{isNotificationDropdownOpen && (
						<div className="absolute right-0 mt-2 w-[400px] rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
							<div className="py-1 flex flex-col gap-0.5">
								<h3 className="px-4 py-2 text-lg font-bold text-gray-800 border-b border-gray-200">Notifications</h3>
								<div className="overflow-y-auto max-h-[450px]">
									{notificationsError && (
										<div className="px-4 py-2 text-sm text-red-700">
											{notificationsError}
										</div>
									)}
									{notifications.length === 0 ? (
										<div className="px-4 py-2 text-sm text-gray-700">No notifications</div>
									) : (
										notifications.map((notif) => (
											<div
												key={notif._id}
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
											>
												<strong>{notif.title}</strong>
												<p>{notif.message}</p>
											</div>
										))
									)}
								</div>
							</div>
						</div>
					)}
				</div>
			)}

			{userError && (
				<></>
			)}
		</>
	);
}

export default NotificationDropdown;