import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import AdminNavbar from '../../components/admin/Navbar';
import SideMenu from '../../components/admin/SideMenu';

function AdminPage() {
	const [greeting, setGreeting] = useState('');
	const [adminCount, setAdminCount] = useState(0);
	const [categoryCount, setCategoryCount] = useState(0);
	const [orderCount, setOrderCount] = useState(0);
	const [productCount, setProductCount] = useState(0);
	const [reservationCount, setReservationCount] = useState(0);
	const [reviewCount, setReviewCount] = useState(0);
	const [ticketCount, setTicketCount] = useState(0);
	const [userCount, setUserCount] = useState(0);

	const fetchGreeting = useCallback(async () => {
		try {
			const time = new Date().getHours();
			if (time < 12) {
				setGreeting('Good morning');
			} else if (time < 18) {
				setGreeting('Good afternoon');
			} else {
				setGreeting('Good evening');
			}
		} catch (error) {
			console.error('Error fetching greeting:', error);
		}
	}, []);

	const fetchAdminCount = useCallback(async () => {
		try {
			const response = await axios.get('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/admins?sort=count');
			setAdminCount(response.data.count);
		} catch (error) {
			console.error('Error fetching admin count:', error);
		}
	}, []);

	const fetchCategoryCount = useCallback(async () => {
		try {
			const response = await axios.get('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/categories?sort=count');
			setCategoryCount(response.data.count);
		} catch (error) {
			console.error('Error fetching category count:', error);
		}
	}, []);

	const fetchOrderCount = useCallback(async () => {
		try {
			const response = await axios.get('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/orders?sort=count');
			setOrderCount(response.data.count);
		} catch (error) {
			console.error('Error fetching order count:', error);
		}
	}, []);

	const fetchProductCount = useCallback(async () => {
		try {
			const response = await axios.get('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/products?sort=count');
			setProductCount(response.data.count);
		} catch (error) {
			console.error('Error fetching product count:', error);
		}
	}, []);

	const fetchReservationCount = useCallback(async () => {
		try {
			const response = await axios.get('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/reservations?sort=count');
			setReservationCount(response.data.count);
		} catch (error) {
			console.error('Error fetching reservation count:', error);
		}
	}, []);

	const fetchReviewCount = useCallback(async () => {
		try {
			const response = await axios.get('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/reviews?sort=count');
			setReviewCount(response.data.count);
		} catch (error) {
			console.error('Error fetching reservation count:', error);
		}
	}, []);

	const fetchTicketCount = useCallback(async () => {
		try {
			const response = await axios.get('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/tickets?sort=count');
			setTicketCount(response.data.count);
		} catch (error) {
			console.error('Error fetching user count:', error);
		}
	}, []);

	const fetchUserCount = useCallback(async () => {
		try {
			const response = await axios.get('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/users?sort=count');
			setUserCount(response.data.count);
		} catch (error) {
			console.error('Error fetching user count:', error);
		}
	}, []);

	const fetchAllData = useCallback(async () => {
		await fetchAdminCount();
		await fetchCategoryCount();
		await fetchOrderCount();
		await fetchProductCount();
		await fetchReservationCount();
		await fetchReviewCount();
		await fetchTicketCount();
		await fetchUserCount();
	}, [fetchAdminCount, fetchCategoryCount, fetchOrderCount, fetchProductCount, fetchReservationCount, fetchReviewCount, fetchTicketCount, fetchUserCount]);

	useEffect(() => {
		fetchGreeting();
	}, [fetchGreeting]);

	useEffect(() => {
		fetchAllData();
	}, [fetchAllData]);

	return (
		<>
			<div className="h-screen w-full flex flex-row">
				<SideMenu />

				<div className="h-full w-4/5 flex flex-col bg-gray-100">
					<AdminNavbar />

					<div className="w-full flex" style={{ height: 'calc(100% - 70px)' }}>
						<div className="w-full h-full flex flex-col gap-4 container mx-auto p-4">
							<header
								className="w-full h-full flex flex-col gap-2 items-center justify-center text-white rounded bg-cover bg-center"
								style={{
									backgroundImage: 'linear-gradient(#DC2626E0, #DC2626E0), url("https://i.postimg.cc/W36Fc4D3/header.jpg")'
								}}
							>
								<h1 className="text-xl font-medium">{greeting}, Admin</h1>
								<h2 className="text-4xl font-extrabold">Welcome to FlavourDash!</h2>
							</header>

							<div className="w-full flex flex-col gap-4 container mx-auto p-4 text-black bg-white rounded">
								<span className="w-full flex flex-row justify-between items-center">
									<h1 className="font-semibold">At a Glance</h1>

									<button
										onClick={fetchAllData}
										className="flex flex-row items-center justify-center gap-2 text-xs text-red-500 px-2 py-2 rounded outline-none bg-white hover:bg-gray-100 focus:bg-gray-100"
									>
										<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-refresh">
											<path stroke="none" d="M0 0h24v24H0z" fill="none" />
											<path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
											<path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
										</svg>
										Refresh
									</button>
								</span>

								<div className="w-full grid grid-cols-4 gap-4">
									<div className="h-24 flex flex-row gap-2.5 items-center justify-center bg-red-50 border border-red-200 rounded">
										<div className="h-full aspect-square flex flex-col items-center justify-center text-red-500">
											<svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-shield">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M6 21v-2a4 4 0 0 1 4 -4h2" />
												<path d="M22 16c0 4 -2.5 6 -3.5 6s-3.5 -2 -3.5 -6c1 0 2.5 -.5 3.5 -1.5c1 1 2.5 1.5 3.5 1.5z" />
												<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
											</svg>
										</div>

										<div className="h-full w-full flex flex-col items-start justify-center gap-0.5">
											<h2 className="text-4xl font-semibold">{adminCount}</h2>
											<p className="text-sm text-gray-500 font-medium">Total Admins</p>
										</div>
									</div>

									<div className="h-24 flex flex-row gap-2.5 items-center justify-center bg-red-50 border border-red-200 rounded">
										<div className="h-full aspect-square flex flex-col items-center justify-center text-red-500">
											<svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-category">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M4 4h6v6h-6z" />
												<path d="M14 4h6v6h-6z" />
												<path d="M4 14h6v6h-6z" />
												<path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
											</svg>
										</div>

										<div className="h-full w-full flex flex-col items-start justify-center gap-0.5">
											<h2 className="text-4xl font-semibold">{categoryCount}</h2>
											<p className="text-sm text-gray-500 font-medium">Total Categories</p>
										</div>
									</div>

									<div className="h-24 flex flex-row gap-2.5 items-center justify-center bg-red-50 border border-red-200 rounded">
										<div className="h-full aspect-square flex flex-col items-center justify-center text-red-500">
											<svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-package">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
												<path d="M12 12l8 -4.5" />
												<path d="M12 12l0 9" />
												<path d="M12 12l-8 -4.5" />
												<path d="M16 5.25l-8 4.5" />
											</svg>
										</div>

										<div className="h-full w-full flex flex-col items-start justify-center gap-0.5">
											<h2 className="text-4xl font-semibold">{orderCount}</h2>
											<p className="text-sm text-gray-500 font-medium">Total Order Requests</p>
										</div>
									</div>

									<div className="h-24 flex flex-row gap-2.5 items-center justify-center bg-red-50 border border-red-200 rounded">
										<div className="h-full aspect-square flex flex-col items-center justify-center text-red-500">
											<svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-basket">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
												<path d="M5.001 8h13.999a2 2 0 0 1 1.977 2.304l-1.255 7.152a3 3 0 0 1 -2.966 2.544h-9.512a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304z" />
												<path d="M17 10l-2 -6" />
												<path d="M7 10l2 -6" />
											</svg>
										</div>

										<div className="h-full w-full flex flex-col items-start justify-center gap-0.5">
											<h2 className="text-4xl font-semibold">{productCount}</h2>
											<p className="text-sm text-gray-500 font-medium">Total Products</p>
										</div>
									</div>

									<div className="h-24 flex flex-row gap-2.5 items-center justify-center bg-red-50 border border-red-200 rounded">
										<div className="h-full aspect-square flex flex-col items-center justify-center text-red-500">
											<svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-tools-kitchen-2">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3" />
											</svg>
										</div>

										<div className="h-full w-full flex flex-col items-start justify-center gap-0.5">
											<h2 className="text-4xl font-semibold">{reservationCount}</h2>
											<p className="text-sm text-gray-500 font-medium">Total Reservations</p>
										</div>
									</div>

									<div className="h-24 flex flex-row gap-2.5 items-center justify-center bg-red-50 border border-red-200 rounded">
										<div className="h-full aspect-square flex flex-col items-center justify-center text-red-500">
											<svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-stars">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M17.8 19.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" />
												<path d="M6.2 19.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" />
												<path d="M12 9.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" />
											</svg>
										</div>

										<div className="h-full w-full flex flex-col items-start justify-center gap-0.5">
											<h2 className="text-4xl font-semibold">{reviewCount}</h2>
											<p className="text-sm text-gray-500 font-medium">Total Reviews</p>
										</div>
									</div>

									<div className="h-24 flex flex-row gap-2.5 items-center justify-center bg-red-50 border border-red-200 rounded">
										<div className="h-full aspect-square flex flex-col items-center justify-center text-red-500">
											<svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-lifebuoy">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
												<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
												<path d="M15 15l3.35 3.35" />
												<path d="M9 15l-3.35 3.35" />
												<path d="M5.65 5.65l3.35 3.35" />
												<path d="M18.35 5.65l-3.35 3.35" />
											</svg>
										</div>

										<div className="h-full w-full flex flex-col items-start justify-center gap-0.5">
											<h2 className="text-4xl font-semibold">{ticketCount}</h2>
											<p className="text-sm text-gray-500 font-medium">Total Tickets</p>
										</div>
									</div>

									<div className="h-24 flex flex-row gap-2.5 items-center justify-center bg-red-50 border border-red-200 rounded">
										<div className="h-full aspect-square flex flex-col items-center justify-center text-red-500">
											<svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
												<path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
												<path d="M16 3.13a4 4 0 0 1 0 7.75" />
												<path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
											</svg>
										</div>

										<div className="h-full w-full flex flex-col items-start justify-center gap-0.5">
											<h2 className="text-4xl font-semibold">{userCount}</h2>
											<p className="text-sm text-gray-500 font-medium">Total Users</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AdminPage;