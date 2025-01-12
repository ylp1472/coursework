import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RedLogo from '../../assets/logo-red.svg';

function SideMenu() {
	const [currentPath, setCurrentPath] = useState('');

	useEffect(() => {
		setCurrentPath(window.location.pathname);
	}, []);

	const isActive = (path) => {
		return currentPath === path;
	};

	const getLinkClasses = (path) => {
		return `w-full flex flex-row items-center gap-2 px-3 py-2 text-sm rounded outline-none cursor-pointer ${isActive(path) ? 'bg-red-500 text-white hover:bg-red-500' : 'text-black hover:bg-red-50'
			}`;
	};

	return (
		<div className="h-full w-1/5 flex flex-col bg-white shadow">
			<div className="container px-6 py-6 md:py-6">
				<Link to="/admin" className="md:w-auto block focus:outline-none">
					<img src={RedLogo} className="h-6" alt="logo" />
				</Link>
			</div>
			<div className="container h-full flex flex-col gap-2.5 overflow-y-auto px-4 py-6 md:py-6">
				<Link to="/admin" className={getLinkClasses('/admin')}>
					<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dashboard">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
						<path d="M13.45 11.55l2.05 -2.05" />
						<path d="M6.4 20a9 9 0 1 1 11.2 0z" />
					</svg>
					Dashboard
				</Link>
				<Link to="/admin/users" className={getLinkClasses('/admin/users')}>
					<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
						<path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
						<path d="M16 3.13a4 4 0 0 1 0 7.75" />
						<path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
					</svg>
					Users
				</Link>
				<Link to="/admin/categories" className={getLinkClasses('/admin/categories')}>
					<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-category">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M4 4h6v6h-6z" />
						<path d="M14 4h6v6h-6z" />
						<path d="M4 14h6v6h-6z" />
						<path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
					</svg>
					Categories
				</Link>
				<Link to="/admin/products" className={getLinkClasses('/admin/products')}>
					<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-basket">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
						<path d="M5.001 8h13.999a2 2 0 0 1 1.977 2.304l-1.255 7.152a3 3 0 0 1 -2.966 2.544h-9.512a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304z" />
						<path d="M17 10l-2 -6" />
						<path d="M7 10l2 -6" />
					</svg>
					Products
				</Link>
				<Link to="/admin/reservations" className={getLinkClasses('/admin/reservations')}>
					<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-tools-kitchen-2">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3" />
					</svg>
					Table Reservations
				</Link>
				<Link to="/admin/orders" className={getLinkClasses('/admin/orders')}>
					<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-package">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
						<path d="M12 12l8 -4.5" />
						<path d="M12 12l0 9" />
						<path d="M12 12l-8 -4.5" />
						<path d="M16 5.25l-8 4.5" />
					</svg>
					Orders
				</Link>
				<Link to="/admin/reviews" className={getLinkClasses('/admin/reviews')}>
					<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-stars">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M17.8 19.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" />
						<path d="M6.2 19.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" />
						<path d="M12 9.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" />
					</svg>
					Reviews
				</Link>
				<Link to="/admin/helpdesk" className={getLinkClasses('/admin/helpdesk')}>
					<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-lifebuoy">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
						<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
						<path d="M15 15l3.35 3.35" />
						<path d="M9 15l-3.35 3.35" />
						<path d="M5.65 5.65l3.35 3.35" />
						<path d="M18.35 5.65l-3.35 3.35" />
					</svg>
					Helpdesk
				</Link>
				<a
					href="/admin/helpchat"
					className={getLinkClasses('/admin/helpchat')}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-messages">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
						<path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
					</svg>
					Helpchat
				</a>
			</div>
		</div>
	);
}

export default SideMenu;